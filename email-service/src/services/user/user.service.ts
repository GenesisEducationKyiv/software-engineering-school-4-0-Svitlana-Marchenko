import {IUserService} from "./user.service.interface";
import {IEmailRepository} from "../../repositories/email/email.repository.interface";
import emailRepository from "../../repositories/email/email.repository";
import {Email} from "../../entity/email.enitity";
import EmailAlreadyAddedError from "../../error/types/emailAlreadyAdded.error";

export class UserService implements IUserService{

    constructor(private emailRepository: IEmailRepository) {}

    async getAllUsersEmail(): Promise<string[]> {
        try {
            const emails = await this.emailRepository.getAll()
            return emails.map(user => user.email);
        } catch (error) {
            throw new Error('Error getting all email: ' + (error as Error).message)
        }
    }

    async addEmail(email: string): Promise<Email>{
        const user = await this.emailRepository.getByEmail(email)

        if (user) {
            throw new EmailAlreadyAddedError({message: `Email ${email} has been added before`, logging: true});
        }

        try {
            return await this.emailRepository.saveEmail(email)
        } catch (error) {
            throw new Error('Error creating email: ' + (error as Error).message)
        }
    }

    async removeEmail(email: string): Promise<Email>{
        try {
            return await this.emailRepository.removeEmail(email)
        } catch (error) {
            throw new Error('Error removing email: ' + (error as Error).message)
        }
    }
}

export default new UserService(emailRepository)