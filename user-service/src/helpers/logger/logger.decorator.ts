import {ILogger, LogLevel} from "./logger.interface";

export class LoggerDecorator implements ILogger {
    private logger: ILogger;

    constructor(logger: ILogger) {
        this.logger = logger;
    }

    log(level: LogLevel, message: string): void {
        this.logger.log(level, message);
    }
}
