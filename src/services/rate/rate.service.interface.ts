export interface IRateService {
    getExchangeRate(): Promise<number>;
}

export interface RateData {
    ccy: string;
    base_ccy: string;
    buy: number;
    sale: number;
}