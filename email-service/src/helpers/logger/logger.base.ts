import winston from 'winston';
import {ILogger, LogLevel} from "./logger.interface";

export class LoggerBase implements ILogger {

    private logger: winston.Logger;

    constructor() {
        this.logger = winston.createLogger({
            level: process.env.LOG_LEVEL || 'info',
            format: winston.format.combine(
                winston.format.colorize({ all: true }),
                winston.format.timestamp({
                    format: 'YYYY-MM-DD hh:mm:ss.SSS A',
                }),
                winston.format.align(),
                winston.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
            ),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'application.log' }),
            ],
        });
    }

    log(level: LogLevel, message: string): void {
        this.logger.log({ level, message });
    }
}

export default new LoggerBase()
