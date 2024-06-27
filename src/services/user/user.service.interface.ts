import { User } from '../../entity/user.entity';

export interface IUserService {
    subscribeEmail(email: string): Promise<void>;
    getAllUsers(): Promise<User[]>;
}