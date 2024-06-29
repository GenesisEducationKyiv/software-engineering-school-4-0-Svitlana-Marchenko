import { Request, Response } from 'express';
import sinon from 'sinon';
import logger from '../../../src/helpers/logger';
import UserAlreadyExistError from "../../error/types/userAlreadyExist.error";
import {errorHandler} from "../../error/handler/error.handler";
import BadRequestError from "../../error/types/badRequest.error";
import RateApiError from "../../error/types/rateApi.error";

describe('errorHandler', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let loggerStub: sinon.SinonStub;

    beforeEach(() => {
        req = {};
        res = {
            status: sinon.stub().returnsThis(),
            send: sinon.stub()
        };
        loggerStub = sinon.stub(logger, 'error');
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should handle UserAlreadyExistError', () => {
        const error = new UserAlreadyExistError({message: 'User already exists'});

        errorHandler(error, req as Request, res as Response);

        expect((res.status as sinon.SinonStub).calledWith(409)).toBe(true);
        expect((res.send as sinon.SinonStub).calledWith({ errors: error.errors })).toBe(true);
    });

    it('should handle BadRequestError', () => {
        const error = new BadRequestError({message:'Bad request'});

        errorHandler(error, req as Request, res as Response);

        expect((res.status as sinon.SinonStub).calledWith(400)).toBe(true);
        expect((res.send as sinon.SinonStub).calledWith({ errors: error.errors })).toBe(true);
    });

    it('should handle RateApiError', () => {
        const error = new RateApiError({message:'Rate API error'});

        errorHandler(error, req as Request, res as Response);

        expect((res.status as sinon.SinonStub).calledWith(500)).toBe(true);
        expect((res.send as sinon.SinonStub).calledWith({ errors: error.errors })).toBe(true);
    });

    it('should handle generic errors', () => {
        const error = new Error('General error');

        errorHandler(error, req as Request, res as Response);

        expect(loggerStub.calledOnce).toBe(true);
        expect((res.status as sinon.SinonStub).calledWith(500)).toBe(true);
        expect((res.send as sinon.SinonStub).calledWith({ errors: [{ message: "Something went wrong" }] })).toBe(true);
    });
});
