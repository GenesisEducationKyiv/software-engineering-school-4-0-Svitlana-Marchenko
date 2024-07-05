import { Event, IEvent } from '../model/event.model';
import {IEventRepository} from "./event.repository.interface";

export class EventRepository implements IEventRepository{
    async saveEvent(event: IEvent): Promise<void> {
        const newEvent = new Event(event);
        await newEvent.save();
        console.log('Event stored:', event);
    }
}

export default new EventRepository()