const cron = require('node-cron');
const nodemailer = require('nodemailer');
const {getExchangeRate} = require("../services/rateService");
const {getAllEmails} = require("../services/userService");
const logger = require('./logger');

const emailService = process.env.EMAIL_SERVICE || 'smtp.gmail.com';
const emailSenderLogin = process.env.EMAIL_LOGIN;
const emailSenderPassword = process.env.EMAIL_PASSWORD;
const emailSender = process.env.EMAIL_SENDER;

const emailSubject = process.env.EMAIL_SUBJECT || 'USD to UAH Exchange Rate';
const emailTextTemplate = process.env.EMAIL_TEXT || '1 USD to UAH - {rate}';

let transporter = nodemailer.createTransport({
    host: emailService,
    port: 587,
    secure: false,
    auth: {
        user: emailSenderLogin,
        pass: emailSenderPassword
    }
});

async function sendEmails() {
    let emails, rate;

    try {
        rate = await getExchangeRate();
        emails = await getAllEmails();
    } catch (err) {
        logger.error(err)
        throw err;
    }

    const emailText = emailTextTemplate.replace('{rate}', rate);

    emails.forEach(e => {
        sendEmail(emailSender, e, emailSubject, emailText)
            .catch(err => console.log(err));
    })
}

async function sendEmail(emailFrom, emailTo, subject, text) {
    let email = await transporter.sendMail({
        from: emailFrom,
        to: emailTo,
        subject: subject,
        text: text
    });
    logger.info(`Email with ID: ${email.messageId} was sent to ${emailTo}`)
}

cron.schedule('0 12 * * *', () => {
    sendEmails()
});
