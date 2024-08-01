import { IEmailConfig } from '../services/scheduler/sendEmail.interface'

export const emailConfig: IEmailConfig = {
   service: process.env.EMAIL_SERVICE || 'smtp.gmail.com',
   login: process.env.EMAIL_LOGIN as string,
   password: process.env.EMAIL_PASSWORD as string,
   sender: process.env.EMAIL_SENDER as string,
   subject: process.env.EMAIL_SUBJECT || 'USD to UAH Exchange Rate',
   textTemplate: process.env.EMAIL_TEXT || '1 USD to UAH - {rate}',
   port: Number(process.env.EMAIL_PORT) || 587,
}
