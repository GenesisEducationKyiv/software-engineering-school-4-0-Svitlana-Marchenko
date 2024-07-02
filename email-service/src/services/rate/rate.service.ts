import {IRateService} from "./rate.service.interface";
import axios from "axios";

export class RateService implements IRateService {

    constructor() {}

    async getExchangeRate(): Promise<number> {
        try {
            const response = await axios.get('http://localhost:3002/api/rate');
            return response.data;
        } catch (error) {
            throw new Error('Error getting rate: ' + (error as Error).message)
        }
    }
}
export default new RateService();