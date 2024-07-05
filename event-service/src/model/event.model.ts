import { Schema, model } from 'mongoose';

export interface IEvent {
    eventId: string;
    aggregateId: string;
    eventType: string;
    eventData: string;
    occurredOn: string;
    metadata: string;
}

export const eventTypeEnum = ['PreparedEmail', 'SentEmail']

const eventSchema = new Schema({
    eventId: {
        type: String,
        required: true
    },
    eventType: {
        type: String,
        required: true,
        enum: eventTypeEnum
    },
    aggregateId: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    data: {
        type: String,
        required: true
    }
});

export const Event = model('Event', eventSchema);