import { IEvent } from '../model/event.model';
import {IEventRepository} from "./event.repository.interface";
import {collections} from "../db/mongo.connection";

export class EventRepository implements IEventRepository{
    async saveEvent(event: IEvent): Promise<void> {
       await collections.events!.insertOne(event);
    }
}

export default new EventRepository()