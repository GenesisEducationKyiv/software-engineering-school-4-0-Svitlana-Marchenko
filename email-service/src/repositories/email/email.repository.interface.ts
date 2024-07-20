import {Email} from "../../entity/email.enitity";

export interface IEmailRepository{

    getAll(): Promise<Email[]>

    getByEmail(email: string): Promise<Email>

    saveEmail(email: string): Promise<Email>

    removeEmail(email: string): Promise<Email>
}