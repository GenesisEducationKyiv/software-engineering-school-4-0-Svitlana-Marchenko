import { IEvent } from '../model/event.model'

export interface IEventService {
   createEvent(event: IEvent): Promise<void>
}
