export interface PrivateBankRateData {
   ccy: string
   base_ccy: string
   buy: number
   sale: number
}

export interface BankGovRateData {
   rate: number
   cc: string
}

export interface CurrencyRates {
   [key: string]: number
}

export interface Fawazahmed0ExchangeRateData {
   usd: CurrencyRates
}
