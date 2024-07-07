import { IEvent, IQueueService } from "./queue.service.interface";
import * as amqp from 'amqplib';
import {errorHandler} from "../../error/handler/error.handler";
import {IEventService} from "../event/event.service.interface";
import eventService from "../event/event.service";
import {IUserService} from "../user/user.service.interface";
import userService from "../user/user.service";
import {IRateService} from "../rate/rate.service.interface";
import rateService from "../rate/rate.service";

class RabbitQueueService implements IQueueService {

    constructor(private rateService: IRateService, private userService: IUserService, private eventService: IEventService) {
    }

    private async connect(): Promise<amqp.Connection> {
        return await amqp.connect('amqp://localhost');
    }

    async listenForEvents(queueName: string, action: (event: IEvent) => Promise<void>): Promise<void> {
        const connection = await this.connect();
        const channel = await connection.createChannel();

        await channel.assertQueue(queueName, { durable: true });

        await channel.consume(queueName, (msg) => {
            if (msg !== null) {
                const event: IEvent = JSON.parse(msg.content.toString());
                action(event)
                channel.ack(msg);
            }
        }, {noAck: false});
    }

    async addUser(event: IEvent) : Promise<void>{
        const email: string =JSON.parse(event.data);
        try {
            await this.userService.addEmail(email)
            await this.eventService.addEvent(event)
        } catch (error) {
            errorHandler(error)
        }
    }

    async removeUser(event: IEvent) : Promise<void>{
        const email: string =JSON.parse(event.data);
        try {
            await this.userService.removeEmail(email)
            await this.eventService.addEvent(event)
        } catch (error) {
            errorHandler(error)
        }
    }

    async changeRate(event: IEvent) : Promise<void>{
        const rate: number =JSON.parse(event.data);
        try {
            await this.rateService.saveNewRate(rate)
            await this.eventService.addEvent(event)
        } catch (error) {
            errorHandler(error)
        }
    }
}

export default new RabbitQueueService(rateService, userService, eventService);
