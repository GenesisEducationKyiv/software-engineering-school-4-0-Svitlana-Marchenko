import {LoggerDecorator} from "../logger.decorator";
import {ILogger} from "../logger.interface";
import loggerBase from "../logger.base";

export class RateLogger extends LoggerDecorator {

    constructor(private logger: ILogger) {
        super(logger);
    }

    rateLog (level: string, name: string, data: string): void {
        const message = `${name} -- ${new Date().toISOString()}: ${JSON.stringify(data)}`;
        super.log(level, message);
    }

    log(level: string, message: string): void {
        super.log(level, message);
    }
}

export default new RateLogger(loggerBase)
