import cron from 'node-cron';
import nodemailer from 'nodemailer';
import {getExchangeRate} from '../services/rate.service';
import {getAllEmails} from '../services/user.service';
import logger from './logger';
import {EmailConfig, EmailDetails} from "./interface/sendEmail.interface";

const emailConfig: EmailConfig = {
    service: process.env.EMAIL_SERVICE || 'smtp.gmail.com',
    login: process.env.EMAIL_LOGIN as string,
    password: process.env.EMAIL_PASSWORD as string,
    sender: process.env.EMAIL_SENDER as string,
    subject: process.env.EMAIL_SUBJECT || 'USD to UAH Exchange Rate',
    textTemplate: process.env.EMAIL_TEXT || '1 USD to UAH - {rate}',
};

const transporter = nodemailer.createTransport({
    host: emailConfig.service,
    port: 587,
    secure: false,
    auth: {
        user: emailConfig.login,
        pass: emailConfig.password,
    },
});

async function sendEmails(): Promise<void> {
    let emails: string[], rate: number;

    try {
        rate = await getExchangeRate();
        emails = await getAllEmails();
    } catch (err) {
        logger.error(err);
        throw err;
    }

    const emailText = emailConfig.textTemplate.replace('{rate}', String(rate));

    for (const email of emails) {
        const emailDetails: EmailDetails = {
            from: emailConfig.sender,
            to: email,
            subject: emailConfig.subject,
            text: emailText,
        };
        try {
            await sendEmail(emailDetails);
        } catch (err) {
            if (err instanceof Error) {
                logger.error(`Error sending email to ${email}: ${err.message}`);
            } else {
                logger.error('Unexpected error: ' + String(err));
            }
        }
    }
}

async function sendEmail({ from, to, subject, text }: EmailDetails): Promise<void> {
    try {
        const email = await transporter.sendMail({
            from: from,
            to: to,
            subject: subject,
            text: text,
        });
        logger.info(`Email with ID: ${email.messageId} was sent to ${to}`);
    } catch (err) {
        if (err instanceof Error) {
            logger.error(`Error sending email: ${err.message}`);
        }
        throw err;
    }
}

cron.schedule('0 12 * * *', () => {
    sendEmails().catch(err => logger.error(`Error in scheduled task: ${err.message}`));
});
