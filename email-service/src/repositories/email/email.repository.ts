import {Repository} from "typeorm/repository/Repository";
import {Email} from "../../entity/email.enitity";
import {v4 as uuidv4} from "uuid";
import {dataSource} from "../../config/dataSource";
import {IEmailRepository} from "./email.repository.interface";

export class EmailRepository implements IEmailRepository {
    constructor(private repository: Repository<Email>) {}

    getAll(): Promise<Email[]> {
        return this.repository.find()
    }

    async saveEmail(email: string): Promise<Email> {
        const emailEntity = this.repository.create({ id: uuidv4(), email: email });
        return await this.repository.save(emailEntity);
    }

    async removeEmail(email: string): Promise<Email> {
        const emailEntity = await this.repository.findOne({ where: { email } });
        if (!emailEntity) {
            return null;
        }
        await this.repository.remove(emailEntity);
        return emailEntity;
    }

    async getByEmail(email: string): Promise<Email> {
        return await this.repository.findOne({ where: { email } })
    }
}

export default new EmailRepository(dataSource.getRepository(Email))