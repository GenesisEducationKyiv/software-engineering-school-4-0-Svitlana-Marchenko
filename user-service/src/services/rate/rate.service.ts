import { IRateService } from './rate.service.interface'
import axios from 'axios'
import { serviceErrorHandler } from '../../error/handler/error.handler'
import { RATE_API_URL } from '../../config/system.config'

export class RateService implements IRateService {
   constructor() {}

   async getExchangeRate(): Promise<number> {
      try {
         const response = await axios.get(RATE_API_URL)
         return response.data
      } catch (error) {
         serviceErrorHandler(error)
      }
   }
}
export default new RateService()
