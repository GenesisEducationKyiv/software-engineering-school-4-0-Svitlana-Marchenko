import { Request, Response } from 'express';
import logger from '../../helpers/logger';
import { errorHandler } from "../../error/handler/error.handler";
import { IMetricsService } from "../../services/metrics/base/metric.service.interface";
import metricService from "../../services/metrics/base/metric.service";

export class MetricController {

    constructor(private metricService: IMetricsService) {}

    async getMetric(req: Request, res: Response): Promise<void> {
        try {
            logger.debug(`Getting metrics`);
            res.setHeader('Content-Type', this.metricService.getRegister().contentType);
            res.end(await this.metricService.getMetrics());
        } catch (error) {
            errorHandler(error, req, res);
        }
    }
}

export default new MetricController(metricService);
