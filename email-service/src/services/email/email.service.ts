import nodemailer from 'nodemailer'
import { emailConfig } from '../../config/email.config'
import SendEmailError from '../../error/types/sendEmail.error'
import {
   IEmailConfig,
   IEmailDetails,
   IEmailSender,
} from './email.service.interface'
import loggerBase from "../../helpers/logger/logger.base";
import {LogLevel} from "../../helpers/logger/logger.interface";

export class EmailSender implements IEmailSender {
   private emailConfig: IEmailConfig

   private transporter: nodemailer.Transporter

   constructor(emailConfig: IEmailConfig) {
      this.emailConfig = emailConfig

      this.transporter = nodemailer.createTransport({
         host: this.emailConfig.service,
         port: this.emailConfig.port,
         secure: false,
         auth: {
            user: this.emailConfig.login,
            pass: this.emailConfig.password,
         },
      })
   }

   async sendEmail({ from, to, subject, text }: IEmailDetails): Promise<void> {
      try {
         const email = await this.transporter.sendMail({
            from: from,
            to: to,
            subject: subject,
            text: text,
         })
         loggerBase.log(LogLevel.Info, `Email with ID: ${email.messageId} was sent to ${to}`)
      } catch (err) {
         throw new SendEmailError({
            message: `Error sending email to ${to}`,
            logging: true,
         })
      }
   }
}

export default new EmailSender(emailConfig)
