import sinon from 'sinon';
import userService from '../../service/services/user/user.service'
import { User } from '../../data-access/entity/user.entity'
import {FIRST_EMAIL, FIRST_ID, SECOND_EMAIL, SECOND_ID} from "../mock/user.const";
import userRepository, {UserRepository} from "../../data-access/repositories/user.repository";
import UserAlreadyExistError from "../../error/types/userAlreadyExist.error";

describe('UserService', () => {
    let userRepositoryStub: sinon.SinonStubbedInstance<UserRepository>;

    beforeEach(() => {
        userRepositoryStub = sinon.stub(userRepository);
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('test subscribeEmail method', () => {
        it('should create a new user if user with given email does not exist', async () => {
            userRepositoryStub.saveByEmail.resolves({ id: FIRST_ID, email: FIRST_EMAIL });

            const user: User = await userService.subscribeEmail(FIRST_EMAIL);

            expect(user.email).toBe(FIRST_EMAIL);
        });

        it('should throw an error if email already exists', async () => {
            userRepositoryStub.getByEmail.resolves({ id: FIRST_ID, email: FIRST_EMAIL });

            await expect(userService.subscribeEmail(FIRST_EMAIL)).rejects.toThrow(UserAlreadyExistError);
        });

        it('should throw an error if saving user fails', async () => {
            userRepositoryStub.saveByEmail.rejects(new Error('Database error'));

            await expect(userService.subscribeEmail(FIRST_EMAIL)).rejects.toThrow('Error creating user: Database error');
        });
    });

    describe('Test getAllUsers method', () => {
        it('should return all users', async () => {
            const users = [
                { id: FIRST_ID, email: FIRST_EMAIL },
                { id: SECOND_ID, email: SECOND_EMAIL }
            ];
            userRepositoryStub.getAll.resolves(users);

            const result = await userService.getAllUsers();

            expect(result).toEqual(users);
        });

        it('should throw an error if fetching users fails', async () => {
            userRepositoryStub.getAll.rejects(new Error('Database error'));

            await expect(userService.getAllUsers()).rejects.toThrow('Error getting all users email: Database error');
        });
    });
});
