import cron from 'node-cron'
import nodemailer from 'nodemailer'
import logger from '../../helpers/logger'
import {IEmailConfig, IEmailDetails} from './interface/sendEmail.interface'
import {User} from '../../data-access/entity/user.entity'
import {IRateService} from "../services/rate/rate.service.interface";
import {IUserService} from "../services/user/user.service.interface";
import rateServiceInstance from '../services/rate/rate.service';
import userServiceInstance from '../services/user/user.service';
import SendEmailError from "../../error/types/sendEmail.error";
import {errorMailHandler} from "../../error/handler/senderError.handler";
import {emailConfig} from "../config/email.config";

class EmailScheduler {

    private emailConfig: IEmailConfig;

    private transporter: nodemailer.Transporter;

    private rateService: IRateService;

    private userService: IUserService;

    constructor(rateService: IRateService, userService: IUserService, emailConfig: IEmailConfig) {

        this.emailConfig = emailConfig
        this.rateService = rateService;
        this.userService = userService;

        this.transporter = nodemailer.createTransport({
            host: this.emailConfig.service,
            port: this.emailConfig.port,
            secure: false,
            auth: {
                user: this.emailConfig.login,
                pass: this.emailConfig.password,
            },
        });
    }

    public start() {
        cron.schedule('0 12 * * *', () => {
            this.sendEmails().catch((err) => {
                errorMailHandler(err)
                }
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
            const emailDetails: IEmailDetails = {
                from: this.emailConfig.sender,
                to: user.email,
                subject: this.emailConfig.subject,
                text: emailText,
            };
                await this.sendEmail(emailDetails);
        }
    }

    private async sendEmail({
                                from,
                                to,
                                subject,
                                text,
                            }: IEmailDetails): Promise<void> {
        try {
            const email = await this.transporter.sendMail({
                from: from,
                to: to,
                subject: subject,
                text: text,
            });
            logger.info(`Email with ID: ${email.messageId} was sent to ${to}`);
        } catch (err) {
            throw new SendEmailError({message: `Error sending email to ${to}`, logging: true});
        }
    }
}

const emailScheduler = new EmailScheduler(rateServiceInstance, userServiceInstance, emailConfig);
emailScheduler.start();
