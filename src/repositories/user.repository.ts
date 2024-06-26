import {IUserRepository} from "./user.repository.interface";
import {Repository} from "typeorm/repository/Repository";
import {User} from "../entity/user.entity";
import {v4 as uuidv4} from "uuid";
import {dataSource} from "../dataSource";

export class UserRepository implements IUserRepository {
    constructor(private repository: Repository<User>) {}

   async getByEmail(email: string): Promise<User> {
        return await this.repository.findOne({ where: { email } })
    }

    private create(email: string): User {
        return this.repository.create({ id: uuidv4(), email })
    }

    async save(user: User): Promise<void>;
    async save(email: string): Promise<void>;

    // Реалізація методу
    async save(param: User | string): Promise<void> {
        if (typeof param === 'string') {
            const user = this.create(param);
            await this.repository.save(user);
        } else {
            await this.repository.save(param);
        }
    }

    getAll(): Promise<User[]> {
        return this.repository.find()
    }
}

export default new UserRepository(dataSource.getRepository(User))