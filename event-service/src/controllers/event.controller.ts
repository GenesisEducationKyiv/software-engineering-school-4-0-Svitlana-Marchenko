import {IEventService} from "../services/event.service.interface";
import {errorHandler} from "../error/handler/error.handler";
import eventService from "../services/event.service";
import { Request, Response } from 'express';
import {EventDTO} from "../dto/event.dto";

export class EventController{

    constructor(private eventService: IEventService) {}

    async addEvent(req: Request, res: Response): Promise<Response> {
        const { aggregateId, eventType, timestamp, data } = req.body;
        const event = new EventDTO(aggregateId, eventType, timestamp, data)
        try {
            const eventDTO = await this.eventService.createEvent(event)
            return res.status(200).json(eventDTO)
        } catch (error) {
            errorHandler(error, req, res)
        }
    }
}

export default new EventController(eventService)