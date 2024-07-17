import { User } from '../../entity/user.entity';

export interface IUserService {
    subscribeEmail(email: string);
    addUser(email: string): Promise<User>;
    resubscribeEmail(email: string): Promise<User>;
    unsubscribeEmail(email: string): Promise<User>;
    getAllUsers(): Promise<User[]>;
    getAllUsersEmails(): Promise<string[]>
    deleteUserByEmail(email: string): Promise<void>;
}