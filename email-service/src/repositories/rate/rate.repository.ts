import {IRateRepository} from "./rate.repository.interface";
import {Rate} from "../../entity/rate.entity";
import {Repository} from "typeorm/repository/Repository";
import {dataSource} from "../../config/dataSource";

export class RateRepository implements IRateRepository {

    constructor(private repository: Repository<Rate>) {}
    async getRate(): Promise<Rate> {
        return await this.repository.findOne({ where: {} });
    }

    async saveNewRate(rate: number): Promise<Rate> {
        const existingRate = await this.getRate();

        if (existingRate) {
            existingRate.rate = rate;
            existingRate.date = new Date();
            return await this.repository.save(existingRate);
        } else {
            const newRate = this.repository.create({ rate, date: new Date() });
            return await this.repository.save(newRate);
        }
    }
}

export default new RateRepository(dataSource.getRepository(Rate))