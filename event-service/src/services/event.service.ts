import { IEvent } from '../model/event.model';
import eventRepository, { EventRepository } from '../repositories/event.repository';
import {IEventService} from "./event.service.interface";

export class EventService implements IEventService{
    constructor(private eventRepository: EventRepository) {}

    async createEvent(event: IEvent): Promise<void> {
        await this.eventRepository.saveEvent(event);
    }
}

export default new EventService(eventRepository)
