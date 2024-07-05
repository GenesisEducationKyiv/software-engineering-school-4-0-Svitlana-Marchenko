import cron from 'node-cron'
import logger from '../../helpers/logger'
import {IRateService} from "../rate/rate.service.interface"
import {IUserService} from "../user/user.service.interface";
import {errorHandler} from "../../error/handler/error.handler";
import {rateMessageConfig} from "../../config/email.config";
import userService from "../user/user.service";
import rateService from "../rate/rate.service";
import {IRateEmailMessageConfig} from "./email.schedular.interface";
import {IEmailDetails, IEmailSender} from "../email/email.service.interface";
import emailService from "../email/email.service";

class EmailScheduler {

    private emailSender: IEmailSender

    private rateEmailSchedularConfig :IRateEmailMessageConfig

    private rateService: IRateService;

    private userService: IUserService;

    constructor(rateService: IRateService, userService: IUserService, emailSender: IEmailSender, rateEmailSchedularConfig :IRateEmailMessageConfig) {
        this.rateService = rateService;
        this.userService = userService;
        this.emailSender = emailSender;
        this.rateEmailSchedularConfig = rateEmailSchedularConfig;
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
            logger.error(err);
            throw err;
        }

        const emailText = this.rateEmailSchedularConfig.textTemplate.replace('{rate}', String(rate));

        for (const email of emails) {
            const emailDetails: IEmailDetails = {
                from: this.rateEmailSchedularConfig.sender,
                to: email,
                subject: this.rateEmailSchedularConfig.subject,
                text: emailText,
            };
                await this.emailSender.sendEmail(emailDetails);
        }
    }
}

export default new EmailScheduler(rateService, userService, emailService, rateMessageConfig);
