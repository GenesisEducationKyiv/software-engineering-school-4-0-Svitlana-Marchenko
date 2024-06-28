import userService from '../../service/services/user/user.service';
import { User } from '../../data-access/entity/user.entity';
import {dataSource} from '../../data-access/config/dataSource';

describe('UserService Integration', () => {
    beforeAll(async () => {
        await dataSource.initialize();
    });

    afterAll(async () => {
        await dataSource.destroy();
    });

    beforeEach(async () => {
        await dataSource.getRepository(User).clear();
    });

    it('should create user', async () => {
        const email = 'email@example.com';

        const newUser = await userService.subscribeEmail(email);
        expect(newUser.email).toBe(email);

        const users = await userService.getAllUsers();
        const foundUser = users.find(user => user.email === email);
        expect(foundUser).toBeDefined();
        expect(foundUser?.email).toBe(email);
    });

    it('should throw an error if email already exists', async () => {
        const email = 'email@example.com';
        await userService.subscribeEmail(email);
        await expect(userService.subscribeEmail(email)).rejects.toThrow('User with email email@example.com already exists');
    });

    it('should return all users', async () => {
        const emails = ['email1@example.com', 'email2@example.com'];

        for (const email of emails) {
            await userService.subscribeEmail(email);
        }

        const users = await userService.getAllUsers();
        expect(users.length).toBe(emails.length);
    });
});
