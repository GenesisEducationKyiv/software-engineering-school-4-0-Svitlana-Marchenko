import { User } from '../data-access/entity/user.entity';

export interface IUserService {
    subscribeEmail(email: string): Promise<User>;
    getAllUsers(): Promise<User[]>;
}