import { Event } from '../entity/event.entity';
import { EventDTO } from '../dto/event.dto';

export class EventMapper {
    static toDTO(event: Event): EventDTO {
        const eventDTO = new EventDTO();
        eventDTO.id = event.id;
        eventDTO.aggregateId = event.aggregateId;
        eventDTO.eventType = event.eventType;
        eventDTO.timestamp = event.timestamp;
        eventDTO.data = event.data;
        return eventDTO;
    }

    static toEntity(eventDTO: EventDTO): Event {
        const event = new Event();
        event.aggregateId = eventDTO.aggregateId;
        event.eventType = eventDTO.eventType;
        event.timestamp = eventDTO.timestamp;
        event.data = eventDTO.data;
        event.id = eventDTO.id;
        return event;
    }
}
