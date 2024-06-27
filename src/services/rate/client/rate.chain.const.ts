import {BaseChain} from "./chain";
import privatebankRateService from "./privatebank.rate.service";
import bankGovRateService from "./bank.gov.rate.service";
import exchangeapiRateService from "./exchangeapi.rate.service";

const privatBankChain = new BaseChain(privatebankRateService)
privatBankChain.setNext(new BaseChain(bankGovRateService)).setNext(new BaseChain(exchangeapiRateService))

export default privatBankChain