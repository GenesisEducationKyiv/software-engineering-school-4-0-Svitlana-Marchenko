import {IRateEmailMessageConfig} from "../services/scheduler/email.schedular.interface";
import {IEmailConfig} from "../services/email/email.service.interface";

export const emailConfig: IEmailConfig = {
    service: process.env.EMAIL_SERVICE || 'smtp.gmail.com',
    login: process.env.EMAIL_LOGIN as string,
    password: process.env.EMAIL_PASSWORD as string,
    port: Number(process.env.EMAIL_PORT) || 587,
};

export const rateMessageConfig: IRateEmailMessageConfig = {
    textTemplate: process.env.EMAIL_TEXT || '1 USD to UAH - {rate}',
    sender: process.env.EMAIL_SENDER as string,
    subject: process.env.EMAIL_SUBJECT || 'USD to UAH Exchange Rate',
};
