import {IEventService} from "./event.service.interface";
import {IEvent} from "../queue/queue.service.interface";
import axios from "axios";
import {EVENT_API_URL} from "../../config/system.config";
import {serviceErrorHandler} from "../../error/handler/error.handler";

class EventService implements IEventService{
    constructor() {}

    async addEvent(event:IEvent): Promise<void> {
        try {
            await axios.post(EVENT_API_URL);
        } catch (error) {
            serviceErrorHandler(error)
        }
    }
}

export default new EventService()