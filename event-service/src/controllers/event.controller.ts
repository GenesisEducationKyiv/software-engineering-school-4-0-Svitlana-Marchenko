import {IEventService} from "../services/event.service.interface";
import {errorHandler} from "../error/handler/error.handler";
import eventService from "../services/event.service";
import { Request, Response } from 'express';

export class EventController{

    constructor(private eventService: IEventService) {}

    async addEvent(req: Request, res: Response): Promise<Response> {
        const {event} = req.body
        try {
           await this.eventService.createEvent(event)
            return res.status(200)
        } catch (error) {
            errorHandler(error, req, res)
        }
    }
}

export default new EventController(eventService)