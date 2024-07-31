export interface ILogger {
    log(level: LogLevel, message: string): void;
}
export enum LogLevel {
    Info = "info",
    Debug = "debug",
    Error = "error"
}