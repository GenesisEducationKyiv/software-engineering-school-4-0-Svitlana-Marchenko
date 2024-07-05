import { Schema, model } from 'mongoose';

export interface IEvent {
    aggregateId: string;
    eventType: string;
    timestamp: string;
    data: string;
}

export const eventTypeEnum = ['PreparedEmail', 'SentEmail']

const eventSchema = new Schema({
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