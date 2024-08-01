import { IEvent } from '../queue/queue.service.interface'

export interface IEventService {
   addEvent(event: IEvent): Promise<void>
}
