export interface IRateEmailMessageConfig {
    textTemplate: string
    sender: string
    subject: string
}

export interface IEmailDetails {
    from: string
    to: string
    subject: string
    text: string
}