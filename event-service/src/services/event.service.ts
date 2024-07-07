import eventRepository, { EventRepository } from '../repositories/event.repository';
import {IEventService} from "./event.service.interface";
import {EventDTO} from "../dto/event.dto";
import {EventMapper} from "../mapper/event.mapper";

export class EventService implements IEventService{
    constructor(private eventRepository: EventRepository) {}

    async createEvent(event: EventDTO): Promise<EventDTO> {
        return await this.eventRepository.saveEvent(EventMapper.toEntity(event));
    }
}

export default new EventService(eventRepository)
