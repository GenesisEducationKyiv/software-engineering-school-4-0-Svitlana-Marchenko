import { IEvent, IQueueService } from './queue.service.interface'
import * as amqp from 'amqplib'
import { LogLevel } from '../../helpers/logger/logger.interface'
import loggerBase from '../../helpers/logger/logger.base'

class RabbitQueueService implements IQueueService {
   private async connect(): Promise<amqp.Connection> {
      return await amqp.connect('amqp://localhost')
   }

   async emitEvent(event: IEvent): Promise<void> {
      const connection = await this.connect()
      const channel = await connection.createChannel()
      const queue = 'email'

      await channel.assertQueue(queue, { durable: true })
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(event)), {
         persistent: true,
      })
      loggerBase.log(
         LogLevel.Info,
         `Event emitted: ${event.aggregateId} - ${event.eventType}`,
      )
      await channel.close()
      await connection.close()
   }
}

export default new RabbitQueueService()
