
export interface IChain{
    setNext(next: IChain): IChain;
    getExchangeRate(): Promise<number>;
}

export interface IRateChainService{
    getExchangeRate(): Promise<number>;
}

export class BaseChain implements IChain {
    private next: IChain | null

    constructor(private rateService: IRateChainService) {}

    setNext(next: IChain): IChain {
        this.next = next;
        return next;
    }

    async getExchangeRate(): Promise<number> {
        try {
            return await this.rateService.getExchangeRate();
        } catch (error) {
            if (!this.next) {
                throw error;
            }
            return this.next.getExchangeRate();
        }
    }
}
