import { Request, Response } from 'express'
import { IRateService } from '../services/rate.service.interface'
import rateService from '../services/rate.service'
import { errorHandler } from '../error/handler/error.handler'
import loggerBase from '../helpers/logger/logger.base'
import { LogLevel } from '../helpers/logger/logger.interface'

export class RateController {
   constructor(private rateService: IRateService) {}

   async getRate(req: Request, res: Response): Promise<Response> {
      try {
         loggerBase.log(LogLevel.Debug, `Getting currency rate`)
         const exchangeRate = await this.rateService.getExchangeRate()
         return res.status(200).json(exchangeRate)
      } catch (error) {
         return errorHandler(error, req, res)
      }
   }
}

export default new RateController(rateService)
