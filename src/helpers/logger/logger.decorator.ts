import {ILogger} from "./logger.interface";

export class LoggerDecorator implements ILogger {
    protected logger: ILogger;

    constructor(logger: ILogger) {
        this.logger = logger;
    }

    log(level: string, message: string): void {
        this.logger.log(level, message);
    }
}
