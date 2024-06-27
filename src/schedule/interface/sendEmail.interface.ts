export interface IEmailConfig {
    service: string
    login: string
    password: string
    sender: string
    subject: string
    textTemplate: string
    port: number
}

export interface IEmailDetails {
    from: string
    to: string
    subject: string
    text: string
}
