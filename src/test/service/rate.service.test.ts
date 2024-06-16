import axios from 'axios';
import sinon from 'sinon';
import RateService from '../../services/rate/rate.service';

describe('RateService', () => {
    let axiosGetStub: sinon.SinonStub;

    beforeEach(() => {
        axiosGetStub = sinon.stub(axios, 'get');
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should return the exchange rate for USD', async () => {
        const rateData = [
                {
                    ccy: "EUR",
                    base_ccy: "UAH",
                    buy: 43.30000,
                    sale: 44.30000
                },
                {
                    ccy: "USD",
                    base_ccy: "UAH",
                    buy: 40.40000,
                    sale: 41.00000
                }
        ];
        axiosGetStub.resolves({ data: rateData });

        const rate = await RateService.getExchangeRate();
        expect(rate).toBe(40.40000);
    });

    it('should throw an error if USD data is not found', async () => {
        const mockRateData = [
            { ccy: 'EUR', base_ccy: 'UAH', buy: 32.0, sale: 32.5 }
        ];
        axiosGetStub.resolves({ data: mockRateData });
        await expect(RateService.getExchangeRate()).rejects.toThrow('Currency data not found');
    });

    it('should throw an error if the API request fails', async () => {
        axiosGetStub.rejects(new Error('Network Error'));
        await expect(RateService.getExchangeRate()).rejects.toThrow('Network Error');
    });
});
