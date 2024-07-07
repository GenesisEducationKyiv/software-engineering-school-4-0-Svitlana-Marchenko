import {IRateService} from "./rate.service.interface";
import {errorHandler} from "../../error/handler/error.handler";
import {IRateRepository} from "../../repositories/rate/rate.repository.interface";
import rateRepository from "../../repositories/rate/rate.repository";

export class RateService implements IRateService {

    constructor(private rateRepository: IRateRepository) {}

    async getExchangeRate(): Promise<number> {
        try {
            const rate = await this.rateRepository.getRate()
            return rate.rate
        } catch (error) {
            errorHandler(error)
        }
    }
}
export default new RateService(rateRepository);