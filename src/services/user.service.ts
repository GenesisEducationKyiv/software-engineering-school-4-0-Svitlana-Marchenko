import {User} from '../entity/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { dataSource as dataSource } from '../dataSource';

export const subscribeEmail = async (email: string): Promise<User> => {
    try {
        const userRepository = dataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { email } });
        if (user) {
            return null;
        }
        const newUser = userRepository.create({ id: uuidv4(), email });
        await userRepository.save(newUser);
        return newUser
    } catch (error) {
        throw new Error('Error creating user: ' + (error as Error).message);
    }
};

export const getAllEmails = async (): Promise<string[]> => {
    try {
        const userRepository = dataSource.getRepository(User);
        const users = await userRepository.find();
        return users.map((u: User) => u.email);
    } catch (error) {
        throw new Error('Error getting all users email: ' + (error as Error).message);
    }
};

export default {
    subscribeEmail,
    getAllEmails,
};
