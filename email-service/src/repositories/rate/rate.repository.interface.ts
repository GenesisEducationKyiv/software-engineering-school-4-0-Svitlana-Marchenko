import {Rate} from "../../entity/rate.entity";

export interface IRateRepository{

    getRate(): Promise<Rate>

    saveNewRate(rate: number): Promise<Rate>

}