import { Request, Response } from 'express';
import sinon from 'sinon';
import RateController from '../../controllers/rate.controller';
import RateService from '../../services/rate/rate.service';

describe('RateController', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let rateServiceStub: sinon.SinonStubbedInstance<typeof RateService>;

    beforeEach(() => {
        req = {
            body: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        rateServiceStub = sinon.stub(RateService);
    });

    afterEach(() => {
        sinon.restore();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('test getRate method', () => {

        it('should get rate from api', async () => {
            rateServiceStub.getExchangeRate.resolves(40.4);

            await RateController.getRate(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
        });

        it('should return 400 if eservice return error', async () => {
            rateServiceStub.getExchangeRate.rejects(new Error('Currency data not found'));

            await RateController.getRate(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
        });
    });
});
