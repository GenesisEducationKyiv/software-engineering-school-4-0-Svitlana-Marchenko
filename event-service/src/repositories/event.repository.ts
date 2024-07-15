import {IEventRepository} from "./event.repository.interface";
import {Event} from "../entity/event.entity";
import {Repository} from "typeorm";
import {dataSource} from "../config/dataSource";
import {EventMapper} from "../mapper/event.mapper";

export class EventRepository implements IEventRepository{

    constructor(private repository: Repository<Event>) {}

    async saveEvent(event: Event): Promise<Event> {
        const savedEvent = await this.repository.save(event);
        return EventMapper.toDTO(savedEvent)
    }
}

export default new EventRepository(dataSource.getRepository(Event))