import sinon from 'sinon';
import userService from '../../services/user/user.service'
import { User } from '../../entity/user.entity'
import { UserAlreadyExistsError } from '../../error/user.error';
import {dataSource} from "../../dataSource";

describe('UserService', () => {
    let userRepositoryStub: sinon.SinonStubbedInstance<any>;

    beforeEach(() => {
        userRepositoryStub = sinon.stub(dataSource.getRepository(User));
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('test subscribeEmail method', () => {
        it('should create a new user if user with given email does not exist', async () => {
            userRepositoryStub.findOne.resolves(null);
            userRepositoryStub.create.returns({ id: '1234', email: 'test@example.com' });
            userRepositoryStub.save.resolves({ id: '1234', email: 'test@example.com' });

            const user = await userService.subscribeEmail('test@example.com');

            expect(user.id).toBe('1234');
            expect(user.email).toBe('test@example.com');
        });

        it('should throw an error if email already exists', async () => {
            userRepositoryStub.findOne.resolves({ id: '1234', email: 'test@example.com' });

            await expect(userService.subscribeEmail('test@example.com')).rejects.toThrow(UserAlreadyExistsError);
        });

        it('should throw an error if saving user fails', async () => {
            userRepositoryStub.findOne.resolves(null);
            userRepositoryStub.create.returns({ id: '1234', email: 'test@example.com' });
            userRepositoryStub.save.rejects(new Error('Database error'));

            await expect(userService.subscribeEmail('test@example.com')).rejects.toThrow('Error creating user: Database error');
        });
    });

    describe('Test getAllUsers method', () => {
        it('should return all users', async () => {
            const users = [
                { id: '1234', email: 'user1@example.com' },
                { id: '1235', email: 'user2@example.com' }
            ];
            userRepositoryStub.find.resolves(users);

            const result = await userService.getAllUsers();

            expect(result).toEqual(users);
        });

        it('should throw an error if fetching users fails', async () => {
            userRepositoryStub.find.rejects(new Error('Database error'));

            await expect(userService.getAllUsers()).rejects.toThrow('Error getting all users email: Database error');
        });
    });
});
