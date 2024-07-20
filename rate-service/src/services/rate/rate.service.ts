import {IChain} from "./client/chain";
import logger from "../../helpers/logger";
import privatBankChain from "./client/rate.chain.const";
import {IRateService} from "./rate.service.interface";
import { v4 as uuid } from 'uuid';
import {IRateRepository} from "../../repository/rate/rate.repository.interface";
import rateRepository from "../../repository/rate/rate.repository";
import {IEvent, IQueueService} from "../queue/queue.service.interface";
import rabbitService from "../queue/rabbit.service";
import {Rate} from "../../entity/rate.entity";

export class RateService implements IRateService {

    constructor(private baseChain: IChain, private rateRepository: IRateRepository, private queueService: IQueueService) {
        this.baseChain = baseChain
    }

    async getExchangeRate(): Promise<number> {
        logger.debug("Getting rate from api")
        const rate = await this.rateRepository.getRate()
        if(rate && new Date(rate.date).setHours(0,0,0,0) == new Date().setHours(0,0,0,0)){
            return rate.rate
        }
        const newRate =  await this.baseChain.getExchangeRate()
        await this.eventQueueAboutChangingRate(newRate, rate)
        await rateRepository.saveNewRate(newRate);
        return newRate
    }

    async updateExchangeRate(): Promise<number> {
        const rate = await this.rateRepository.getRate()
        const newRate =  await this.baseChain.getExchangeRate()
        await this.eventQueueAboutChangingRate(newRate, rate)
        await rateRepository.saveNewRate(newRate);
        return newRate
    }

    private async eventQueueAboutChangingRate(rate: number, prevRate: Rate) {
        if (prevRate && rate != prevRate.rate) {
            const rateData: IEvent = {
                aggregateId: uuid(),
                eventType: 'RateChanged',
                timestamp: new Date().toString(),
                data: JSON.stringify(rate)
            };
            await this.queueService.emitEvent(rateData, "rate")
        }
    }
}

export default new RateService(privatBankChain, rateRepository, rabbitService);