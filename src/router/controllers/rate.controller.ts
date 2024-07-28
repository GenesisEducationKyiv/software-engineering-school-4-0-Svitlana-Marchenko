import {Request, Response} from 'express'
import {IRateService} from "../../service/services/rate/rate.service.interface"
import rateService from "../../service/services/rate/rate.service";
import {errorHandler} from "../../error/handler/error.handler";
import loggerBase from "../../helpers/logger/logger.base";


export class RateController {

    constructor(private rateService: IRateService) {}

    async getRate(req: Request, res: Response): Promise<Response> {
        try {
            loggerBase.log('debug', `Getting currency rate`)
            const exchangeRate = await this.rateService.getExchangeRate()
            return res.status(200).json(exchangeRate)
        } catch (error) {
            return errorHandler(error, req, res)
        }
    }
}

export default new RateController(rateService)