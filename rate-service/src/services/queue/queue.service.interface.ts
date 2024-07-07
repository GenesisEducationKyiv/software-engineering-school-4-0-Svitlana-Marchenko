export interface IQueueService {
    emitEvent(event: IEvent, queue: string): Promise<void>
}

export interface IEvent {
    aggregateId: string;
    eventType: string;
    timestamp: string;
    data: string;
}