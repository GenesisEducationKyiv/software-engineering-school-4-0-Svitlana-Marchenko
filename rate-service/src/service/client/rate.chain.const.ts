import {BaseChain} from "./chain";
import privatebankRateService from "../../data-access/rateClient/privatebank.rate.service";
import bankGovRateService from "../../data-access/rateClient/bank.gov.rate.service";
import exchangeapiRateService from "../../data-access/rateClient/exchangeapi.rate.service";


const privatBankChain = new BaseChain(privatebankRateService)
privatBankChain.setNext(new BaseChain(bankGovRateService)).setNext(new BaseChain(exchangeapiRateService))

export default privatBankChain