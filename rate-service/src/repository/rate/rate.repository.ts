import {IRateRepository} from "./rate.repository.interface";
import {Rate} from "../../entity/rate.entity";
import {Repository} from "typeorm/repository/Repository";
import {v4 as uuidv4} from "uuid";
import {dataSource} from "../../config/dataSource";

export class RateRepository implements IRateRepository {

    constructor(private repository: Repository<Rate>) {}
    async getRate(): Promise<Rate | null> {
        const rates = await this.repository.find({
            order: {
                date: 'DESC'
            },
            take: 1
        });
        return rates.length > 0 ? rates[0] : null;
    }

    async saveNewRate(rate: number): Promise<Rate> {
        const existingRate = await this.getRate();

        if (existingRate) {
            existingRate.rate = rate;
            existingRate.date = new Date();
            return await this.repository.save(existingRate);
        } else {
            const newRate = this.repository.create({id: uuidv4(), rate: rate, date: new Date()});
            return await this.repository.save(newRate);
        }
    }
}

export default new RateRepository(dataSource.getRepository(Rate))