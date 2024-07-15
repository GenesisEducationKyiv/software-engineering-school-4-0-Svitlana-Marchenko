import {IEvent, IQueueService} from "./queue.service.interface";
import * as amqp from 'amqplib';
import logger from "../../helpers/logger";

class RabbitQueueService implements IQueueService{

    private async connect(): Promise<amqp.Connection> {
        return await amqp.connect('amqp://localhost');
    }

    async emitEvent(event: IEvent, queue: string): Promise<void> {
        const connection = await this.connect();
        const channel = await connection.createChannel();

        await channel.assertQueue(queue, { durable: true });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(event)), { persistent: true });
        logger.info(`Event emitted: ${(event.aggregateId)} - ${event.eventType}`);
        await channel.close();
        await connection.close();
    }
}

export default new RabbitQueueService()