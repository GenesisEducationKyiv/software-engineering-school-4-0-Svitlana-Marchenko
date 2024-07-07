import {Email} from "../../entity/email.enitity";

export interface IUserService {
    getAllUsersEmail(): Promise<string[]>;
    addEmail(email: string): Promise<Email>;
    removeEmail(email: string): Promise<Email>;
}