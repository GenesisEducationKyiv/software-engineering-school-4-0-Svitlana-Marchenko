export interface EmailConfig {
    service: string;
    login: string;
    password: string;
    sender: string;
    subject: string;
    textTemplate: string;
}

export interface EmailDetails {
    from: string;
    to: string;
    subject: string;
    text: string;
}
