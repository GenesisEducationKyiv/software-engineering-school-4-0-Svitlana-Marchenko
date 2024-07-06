export interface IQueueService {
    listenForEvents(): Promise<void>
}

export interface IEvent {
    aggregateId: string;
    eventType: string;
    timestamp: string;
    data: string;
}