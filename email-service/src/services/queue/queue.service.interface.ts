export interface IQueueService {
    listenForEvents(queueName: string, action: (event: IEvent) => Promise<void>): Promise<void>
}

export interface IEvent {
    aggregateId: string;
    eventType: string;
    timestamp: string;
    data: string;
}