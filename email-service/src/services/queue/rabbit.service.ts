import { IEvent, IQueueService } from './queue.service.interface'
import * as amqp from 'amqplib'
import emailService from '../email/email.service'
import { IEmailDetails, IEmailSender } from '../email/email.service.interface'
import { errorHandler } from '../../error/handler/error.handler'
import { IEventService } from '../event/event.service.interface'
import eventService from '../event/event.service'

class RabbitQueueService implements IQueueService {
   constructor(
      private emailSender: IEmailSender,
      private eventService: IEventService,
   ) {}

   private async connect(): Promise<amqp.Connection> {
      return await amqp.connect('amqp://localhost')
   }

   async listenForEvents(
      queueName: string,
      action: (event: IEvent) => Promise<void>,
   ): Promise<void> {
      const connection = await this.connect()
      const channel = await connection.createChannel()

      await channel.assertQueue(queueName, { durable: true })

      await channel.consume(
         queueName,
         (msg) => {
            if (msg !== null) {
               const event: IEvent = JSON.parse(msg.content.toString())
               action(event)
               channel.ack(msg)
            }
         },
         { noAck: false },
      )
   }

   async sendEmail(event: IEvent): Promise<void> {
      const emailData: IEmailDetails = JSON.parse(event.data)
      try {
         await this.emailSender.sendEmail(emailData)
         event.data = null
         event.eventType = 'SentEmail'
         await this.eventService.addEvent(event)
      } catch (error) {
         errorHandler(error)
      }
   }
}

export default new RabbitQueueService(emailService, eventService)
