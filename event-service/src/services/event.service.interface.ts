import {EventDTO} from "../dto/event.dto";

export interface IEventService{
    createEvent(event: EventDTO ): Promise<EventDTO>
}