import {IUserRepository} from "./user.repository.interface";
import {Repository} from "typeorm/repository/Repository";
import {User} from "../entity/user.entity";
import {v4 as uuidv4} from "uuid";
import {dataSource} from "../dataSource";

export class UserRepository implements IUserRepository {
    constructor(private repository: Repository<User>) {}

   async getUserByEmail(email: string): Promise<User> {
        return await this.repository.findOne({ where: { email } })
    }

    createUser(id: string, email: string): User {
        return this.repository.create({ id: uuidv4(), email })
    }

    async saveUser(user: User): Promise<void> {
        await this.repository.save(user)
    }

    getAllUsers(): Promise<User[]> {
        return this.repository.find()
    }
}

export default new UserRepository(dataSource.getRepository(User))