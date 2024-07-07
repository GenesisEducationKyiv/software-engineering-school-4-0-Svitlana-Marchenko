import {Rate} from "../../entity/rate.entity";

export interface IRateService {
    getExchangeRate(): Promise<number>;

    saveNewRate(rate: number): Promise<Rate>
}