import { IEvent, IQueueService } from "./queue.service.interface";
import * as amqp from 'amqplib';

class RabbitQueueService implements IQueueService {

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
                console.log('Event received:', event);

                channel.ack(msg);
            }
        }, { noAck: false });
    }
}

export default new RabbitQueueService();
