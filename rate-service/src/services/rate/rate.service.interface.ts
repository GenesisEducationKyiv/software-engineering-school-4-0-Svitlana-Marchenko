export interface IRateService {
    getExchangeRate(): Promise<number>;
    updateExchangeRate(): Promise<number>
}