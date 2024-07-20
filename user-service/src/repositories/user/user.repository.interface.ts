import {User} from "../../entity/user.entity";

export interface IUserRepository{
    getByEmail(email: string): Promise<User>
    saveByUser(user: User): Promise<User>
    saveByEmail(email: string): Promise<User>
    getAll(): Promise<User[]>
    deleteByEmail(email: string): Promise<void>;
}