import {User} from "../entity/user.entity";

export interface IUserRepository{
    getByEmail(email: string): Promise<User>

    save(user: User): Promise<void>

    save(email: string): Promise<void>

    getAll(): Promise<User[]>
}