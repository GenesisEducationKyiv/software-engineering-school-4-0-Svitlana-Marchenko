export interface IQueueService {
   emitEvent(event: IEvent): Promise<void>
}

export interface IEvent {
   aggregateId: string
   eventType: string
   timestamp: string
   data: string
}
