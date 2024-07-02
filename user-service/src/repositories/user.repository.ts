import {IUserRepository} from "./user.repository.interface";
import {Repository} from "typeorm/repository/Repository";
import {User} from "../entity/user.entity";
import {v4 as uuidv4} from "uuid";
import {dataSource} from "../config/dataSource";

export class UserRepository implements IUserRepository {
    constructor(private repository: Repository<User>) {}

   async getByEmail(email: string): Promise<User> {
        return await this.repository.findOne({ where: { email } })
    }

    private create(email: string): User {
        return this.repository.create({ id: uuidv4(), email })
    }

    getAll(): Promise<User[]> {
        return this.repository.find()
    }

    async saveByEmail(email: string): Promise<User> {
        return this.saveByUser(this.create(email))
    }

   async saveByUser(user: User): Promise<User> {
        return await this.repository.save(user);
    }
}

export default new UserRepository(dataSource.getRepository(User))