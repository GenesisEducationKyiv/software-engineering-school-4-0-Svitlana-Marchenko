import {EventTypeEnum} from '../entity/event.entity';

export class EventDTO {

    constructor();
    constructor(aggregateId: string, eventType: EventTypeEnum, timestamp: Date, data: string);
    constructor(aggregateId?: string, eventType?: EventTypeEnum, timestamp?: Date, data?: string) {
        if (aggregateId !== undefined && eventType !== undefined && timestamp !== undefined && data !== undefined) {
            this.aggregateId = aggregateId;
            this.eventType = eventType;
            this.timestamp = timestamp;
            this.data = data;
        }
    }

    id: string;

    aggregateId: string;

    eventType: EventTypeEnum;

    timestamp: Date;

    data: string;
}
