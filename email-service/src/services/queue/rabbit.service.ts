import { IEvent, IQueueService } from "./queue.service.interface";
import * as amqp from 'amqplib';
import emailService from "../email/email.service";
import {IEmailDetails, IEmailSender} from "../email/email.service.interface";
import {errorHandler} from "../../error/handler/error.handler";
import {IEventService} from "../event/event.service.interface";
import eventService from "../event/event.service";

class RabbitQueueService implements IQueueService {

    constructor(private emailSender: IEmailSender, private eventService: IEventService) {
    }

    private async connect(): Promise<amqp.Connection> {
        return await amqp.connect('amqp://localhost');
    }

    async listenForEvents(): Promise<void> {
        const connection = await this.connect();
        const channel = await connection.createChannel();
        const queue = 'email';

        await channel.assertQueue(queue, { durable: true });

        channel.consume(queue, (msg) => {
            if (msg !== null) {
                const event: IEvent = JSON.parse(msg.content.toString());
                this.sendEmail(event)
                channel.ack(msg);
            }
        }, { noAck: false });
    }

    private sendEmail(event: IEvent){
        const emailData: IEmailDetails =JSON.parse(event.data);
        try {
            this.emailSender.sendEmail(emailData);
            event.data=null
            event.eventType='SentEmail'
            this.eventService.addEvent(event)
        } catch (error) {
            errorHandler(error)
        }
    }
}

export default new RabbitQueueService(emailService, eventService);
