import { IEvent, IQueueService } from "./queue.service.interface";
import * as amqp from 'amqplib';
import userService from "../user/user.service";
import {IUserService} from "../user/user.service.interface";
import customerService from "../customer/customer.service";
import {ICustomerService} from "../customer/customer.service.interface";
import {errorHandler} from "../../error/handler/error.handler";


class RabbitQueueService implements IQueueService {

    constructor(private userService: IUserService, private customerService: ICustomerService) {
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

    async addNewSubscriber(event: IEvent) : Promise<void>{
        const email: string = JSON.parse(event.data);
        try {
            await this.userService.addUser(email);
            try {
                await this.customerService.addCustomer(email);
            } catch (error) {
                await this.userService.rollbackUser(email);
                errorHandler(error)
            }
        } catch (error) {
            errorHandler(error)
        }
    }

}

export default new RabbitQueueService(userService, customerService);
