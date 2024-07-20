import {IRateEmailMessageConfig} from "../services/scheduler/scheduler.service.interface";

export const rateMessageConfig: IRateEmailMessageConfig = {
    textTemplate: process.env.EMAIL_TEXT || '1 USD to UAH - {rate}',
    sender: process.env.EMAIL_SENDER as string,
    subject: process.env.EMAIL_SUBJECT || 'USD to UAH Exchange Rate',
};