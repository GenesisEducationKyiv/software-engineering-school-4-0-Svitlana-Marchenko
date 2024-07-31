import cron from 'node-cron'
import nodemailer from 'nodemailer'
import {IEmailConfig, IEmailDetails} from './sendEmail.interface'
import {IRateService} from "../rate/rate.service.interface"
import {IUserService} from "../user/user.service.interface";
import {errorHandler} from "../../error/handler/error.handler";
import {emailConfig} from "../../config/email.config";
import SendEmailError from "../../error/types/sendEmail.error";
import userService from "../user/user.service";
import rateService from "../rate/rate.service";
import loggerBase from "../../helpers/logger/logger.base";
import {LogLevel} from "../../helpers/logger/logger.interface";

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
                errorHandler(err)
                }
            );
        });
    }

    private async sendEmails(): Promise<void> {
        let emails: string[], rate: number;

        try {
            rate = await this.rateService.getExchangeRate();
            emails = await this.userService.getAllUsersEmail();
        } catch (err) {
            loggerBase.log(LogLevel.Error, err);
            throw err;
        }

        const emailText = this.emailConfig.textTemplate.replace('{rate}', String(rate));

        for (const email of emails) {
            const emailDetails: IEmailDetails = {
                from: this.emailConfig.sender,
                to: email,
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
            loggerBase.log(LogLevel.Info, `Email with ID: ${email.messageId} was sent to ${to}`);
        } catch (err) {
            throw new SendEmailError({message: `Error sending email to ${to}`, logging: true});
        }
    }
}

export default new EmailScheduler(rateService, userService, emailConfig);
