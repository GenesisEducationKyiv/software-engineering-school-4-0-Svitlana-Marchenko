export interface IEmailConfig {
   service: string
   login: string
   password: string
   port: number
}

export interface IEmailDetails {
   from: string
   to: string
   subject: string
   text: string
}

export interface IEmailSender {
   sendEmail(emailDetails: IEmailDetails): Promise<void>
}
