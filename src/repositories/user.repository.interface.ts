import {User} from "../entity/user.entity";

export interface IUserRepository{
    getUserByEmail(email: string): Promise<User>

    createUser(id: string, email: string): User

    saveUser(user: User): Promise<void>

    getAllUsers(): Promise<User[]>
}