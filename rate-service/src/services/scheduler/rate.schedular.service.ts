import cron from 'node-cron'
import {IRateService} from "../rate/rate.service.interface"
import rateService from "../rate/rate.service";

class RateScheduler {

    constructor(private rateService: IRateService) {}

    public start() {
        cron.schedule('0 9 * * *', () => {
            this.rateService.updateExchangeRate()
        });
    }
}

export default new RateScheduler(rateService);
