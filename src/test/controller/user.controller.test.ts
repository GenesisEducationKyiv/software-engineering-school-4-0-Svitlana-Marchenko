import { Request, Response } from 'express';
import sinon from 'sinon';
import UserController from '../../controllers/user.controller';
import UserService from '../../services/user/user.service';
import { UserAlreadyExistsError } from '../../error/user.error';
import {FIRST_EMAIL, FIRST_ID} from "../mock/user.const";

describe('UserController', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let userServiceStub: sinon.SinonStubbedInstance<typeof UserService>;

    beforeEach(() => {
        req = {
            body: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        userServiceStub = sinon.stub(UserService);
    });

    afterEach(() => {
        sinon.restore();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('test subscribeEmail method', () => {

        it('should create a new user if user with given email does not exist', async () => {
            req.body = { email: FIRST_EMAIL };
            userServiceStub.subscribeEmail.resolves({ id: FIRST_ID, email: FIRST_EMAIL });

            await UserController.subscribeEmail(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(userServiceStub.subscribeEmail.calledOnce).toBe(true);
            expect(userServiceStub.subscribeEmail.calledWith(FIRST_EMAIL)).toBe(true);
        });

        it('should return 409 if email exists', async () => {
            req.body = { email: FIRST_EMAIL };
            userServiceStub.subscribeEmail.rejects(new UserAlreadyExistsError(FIRST_EMAIL));

            await UserController.subscribeEmail(req as Request, res as Response);

            expect(userServiceStub.subscribeEmail.calledWith(FIRST_EMAIL)).toBe(true);
            expect(userServiceStub.subscribeEmail.calledOnce).toBe(true);
            expect(res.status).toHaveBeenCalledWith(409);
        });

        it('should return 500 if db error', async () => {
            req.body = { email: FIRST_EMAIL };
            userServiceStub.subscribeEmail.rejects(new Error('Database error'));

            await UserController.subscribeEmail(req as Request, res as Response);

            expect(userServiceStub.subscribeEmail.calledOnce).toBe(true);
            expect(userServiceStub.subscribeEmail.calledWith(FIRST_EMAIL)).toBe(true);
            expect(res.status).toHaveBeenCalledWith(500);
        });

        it('should return 400 if validation error', async () => {
            req.body = { email: 'test' };

            await UserController.subscribeEmail(req as Request, res as Response);
            expect(userServiceStub.subscribeEmail.notCalled)
            expect(res.status).toHaveBeenCalledWith(400);
        });
    });

});
