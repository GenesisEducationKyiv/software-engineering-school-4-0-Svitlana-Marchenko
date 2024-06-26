import {Request, Response} from 'express'
import logger from '../helpers/logger'
import {IRateService} from "../services/rate/rate.service.interface";
import rateService from "../services/rate/rate.service";
import {errorHandler} from "../error/handler/error.handler";

export class RateController {

    constructor(private rateService: IRateService) {}

    async getRate(req: Request, res: Response): Promise<Response> {
        try {
            logger.debug(`Getting currency rate`)
            const exchangeRate = await this.rateService.getExchangeRate()
            return res.status(200).json(exchangeRate)
        } catch (error) {
            errorHandler(error, req, res)
        }
    }
}

export default new RateController(rateService)