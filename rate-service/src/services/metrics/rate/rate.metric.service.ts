import {IRateMetricService} from "./rate.metric.service.interface";
import {IMetricsService} from "../base/metric.service.interface";
import metricService from "../base/metric.service";

export class RateMetricService implements IRateMetricService{

    constructor(private metricsService: IMetricsService) {}

    addGetRateCall() {
        this.metricsService.incrementCounter('get_exchange_rate_calls', { method: 'getExchangeRate' });
    }

    addGetRateFailed(){
        this.metricsService.incrementCounter('get_exchange_rate_fails', { method: 'getExchangeRate' });
    }

}

export default new RateMetricService(metricService)