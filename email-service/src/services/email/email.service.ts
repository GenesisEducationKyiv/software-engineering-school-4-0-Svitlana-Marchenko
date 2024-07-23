import nodemailer from 'nodemailer'
import logger from '../../helpers/logger'
import {emailConfig} from "../../config/email.config";
import SendEmailError from "../../error/types/sendEmail.error";
import {IEmailConfig, IEmailDetails, IEmailSender} from "./email.service.interface";
import emailMetricService, {EmailMetricService} from "../metric/email/email.metric.service";

export class EmailSender implements IEmailSender {

    private emailConfig: IEmailConfig;

    private metricService: EmailMetricService

    private transporter: nodemailer.Transporter;

    constructor(emailConfig: IEmailConfig, metricService: EmailMetricService) {
        this.emailConfig = emailConfig
        this.metricService = metricService

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

    async sendEmail({
                                from,
                                to,
                                subject,
                                text,
                            }: IEmailDetails): Promise<void> {
        try {
            this.metricService.addSendEmailCall()
            const email = await this.transporter.sendMail({
                from: from,
                to: to,
                subject: subject,
                text: text,
            });
            logger.info(`Email with ID: ${email.messageId} was sent to ${to}`);
        } catch (err) {
            this.metricService.addSendEmailFailed()
            throw new SendEmailError({message: `Error sending email to ${to}`, logging: true});
        }
    }
}

export default new EmailSender(emailConfig, emailMetricService);
