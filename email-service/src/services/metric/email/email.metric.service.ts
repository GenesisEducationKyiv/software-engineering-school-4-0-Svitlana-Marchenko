
import {IMetricsService} from "../base/metric.service.interface";
import metricService from "../base/metric.service";
import {IEmailMetricService} from "./email.metric.service.interface";

export class EmailMetricService implements IEmailMetricService{

    constructor(private metricsService: IMetricsService) {}

    addSendEmailCall() {
        this.metricsService.incrementCounter('send_email_calls', { method: 'sendEmail' });
    }

    addSendEmailFailed(){
        this.metricsService.incrementCounter('send_email_fails', { method: 'sendEmail' });
    }

}

export default new EmailMetricService(metricService)