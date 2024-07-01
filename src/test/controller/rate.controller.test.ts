import { Request, Response } from 'express';
import sinon from 'sinon';
import rateService from "../../service/services/rate/rate.service";
import {RateController} from "../../router/controllers/rate.controller";
import RateApiError from "../../error/types/rateApi.error";

describe('RateController', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let rateServiceStub: sinon.SinonStub;

    beforeEach(() => {
        req = {};
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
            send: sinon.stub()
        };
        rateServiceStub = sinon.stub(rateService, 'getExchangeRate');
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should return 200 and the exchange rate if service succeeds', async () => {
        const exchangeRate = { rate: 40.4 };
        rateServiceStub.resolves(exchangeRate);

        const controller = new RateController(rateService);
        await controller.getRate(req as Request, res as Response);

        expect(rateServiceStub.calledOnce).toBe(true);
        expect((res.status as sinon.SinonStub).calledWith(200)).toBe(true);
        expect((res.json as sinon.SinonStub).calledWith(exchangeRate)).toBe(true);
    });

    it('should return 500 if service returns error', async () => {
        rateServiceStub.rejects(new RateApiError({ message: 'Currency data not found' }));

        const controller = new RateController(rateService);
        await controller.getRate(req as Request, res as Response);

        expect(rateServiceStub.calledOnce).toBe(true);
        expect((res.status as sinon.SinonStub).calledWith(500)).toBe(true);
    });
});
