import axios from 'axios';
import sinon from 'sinon';
import RateService from '../../services/rate/rate.service';
import {rateApiBadResponse, rateApiResponse} from "../mock/rate.mock";

describe('RateService', () => {
    let axiosGetStub: sinon.SinonStub;

    beforeEach(() => {
        axiosGetStub = sinon.stub(axios, 'get');
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should return the exchange rate', async () => {
        axiosGetStub.resolves({ data: rateApiResponse });

        const rate = await RateService.getExchangeRate();
        expect(rate).toBe(40.40000);
    });

    it('should throw an error if USD data is not found', async () => {
        axiosGetStub.resolves({ data: rateApiBadResponse });
        await expect(RateService.getExchangeRate()).rejects.toThrow('Currency data not found');
    });

    it('should throw an error if the API request fails', async () => {
        axiosGetStub.rejects(new Error('Network Error'));
        await expect(RateService.getExchangeRate()).rejects.toThrow('Network Error');
    });
});
