export interface IQueueService {
    consumeMessages(): Promise<void>
}