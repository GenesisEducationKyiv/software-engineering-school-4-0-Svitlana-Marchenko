import { IEvent } from '../model/event.model'

export interface IEventRepository {
   saveEvent(event: IEvent): Promise<void>
}
