import { User } from '../../';

export interface IUserService {
    subscribeEmail(email: string): Promise<User>;
    getAllUsers(): Promise<User[]>;
}