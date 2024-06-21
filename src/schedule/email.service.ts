import cron from 'node-cron'
import nodemailer from 'nodemailer'
import logger from '../helpers/logger'
import {EmailConfig, EmailDetails} from './interface/sendEmail.interface'
import {User} from '../entity/user.entity'
import {IRateService} from "../services/rate/rate.service.interface";
import {IUserService} from "../services/user/user.service.interface";
import rateServiceInstance from '../services/rate/rate.service';
import userServiceInstance from '../services/user/user.service';

class EmailScheduler {

    private emailConfig: EmailConfig;

    private transporter: nodemailer.Transporter;

    private rateService: IRateService;

    private userService: IUserService;

    constructor(rateService: IRateService, userService: IUserService) {
        this.emailConfig = {
            service: process.env.EMAIL_SERVICE || 'smtp.gmail.com',
            login: process.env.EMAIL_LOGIN as string,
            password: process.env.EMAIL_PASSWORD as string,
            sender: process.env.EMAIL_SENDER as string,
            subject: process.env.EMAIL_SUBJECT || 'USD to UAH Exchange Rate',
            textTemplate: process.env.EMAIL_TEXT || '1 USD to UAH - {rate}',
        };

        this.transporter = nodemailer.createTransport({
            host: this.emailConfig.service,
            port: 587,
            secure: false,
            auth: {
                user: this.emailConfig.login,
                pass: this.emailConfig.password,
            },
        });

        this.rateService = rateService;
        this.userService = userService;
    }

    public start() {
        cron.schedule('0 12 * * *', () => {
            this.sendEmails().catch((err) =>
                logger.error(`Error in scheduled task: ${err.message}`)
            );
        });
    }

    private async sendEmails(): Promise<void> {
        let users: User[], rate: number;

        try {
            rate = await this.rateService.getExchangeRate();
            users = await this.userService.getAllUsers();
        } catch (err) {
            logger.error(err);
            throw err;
        }

        const emailText = this.emailConfig.textTemplate.replace('{rate}', String(rate));

        for (const user of users) {
            const emailDetails: EmailDetails = {
                from: this.emailConfig.sender,
                to: user.email,
                subject: this.emailConfig.subject,
                text: emailText,
            };
            try {
                await this.sendEmail(emailDetails);
            } catch (err) {
                logger.error(`Error sending email to ${user.email}: ${err.message}`);
            }
        }
    }

    private async sendEmail({
                                from,
                                to,
                                subject,
                                text,
                            }: EmailDetails): Promise<void> {
        try {
            const email = await this.transporter.sendMail({
                from: from,
                to: to,
                subject: subject,
                text: text,
            });
            logger.info(`Email with ID: ${email.messageId} was sent to ${to}`);
        } catch (err) {
            logger.error(`Error sending email: ${err.message}`);
            throw err;
        }
    }
}

const emailScheduler = new EmailScheduler(rateServiceInstance, userServiceInstance);
emailScheduler.start();
