import {Event} from "../entity/event.entity";

export interface IEventRepository{
    saveEvent(event: Event): Promise<Event>
}