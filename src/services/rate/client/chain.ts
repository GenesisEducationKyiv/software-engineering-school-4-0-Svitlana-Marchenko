import {IRateService} from "../rate.service.interface";

export interface IChain extends IRateService{
    setNext(next: IChain): void;
}

export class BaseChain implements IChain {
    private next: IChain | null

    constructor(private rateService: IRateService) {}

    setNext(next: IChain): IChain {
        this.next = next;
        return next;
    }

    async getExchangeRate(): Promise<number> {
        try {
            return await this.rateService.getExchangeRate();
        } catch (error) {
            if (this.next === null) {
                throw error;
            }
            return this.next.getExchangeRate();
        }
    }
}
