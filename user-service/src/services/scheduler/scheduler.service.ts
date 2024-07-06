import {IUserService} from "../user/user.service.interface";
import {IRateService} from "../rate/rate.service.interface";
import cron from 'node-cron'
import { v4 as uuid } from 'uuid';
import {serviceErrorHandler} from "../../error/handler/error.handler";
import {IEmailDetails, IRateEmailMessageConfig} from "./scheduler.service.interface";
import {IEvent, IQueueService} from "../queue/queue.service.interface";
import userService from "../user/user.service";
import rateService from "../rate/rate.service";
import {rateMessageConfig} from "../../config/scheduler.config";
import rabbitService from "../queue/rabbit.service";
import {IEventService} from "../event/event.service.interface";
import eventService from "../event/event.service";

export class SchedulerService{

    constructor(private userService: IUserService,
                private rateService: IRateService,
                private rateEmailMessageConfig: IRateEmailMessageConfig,
                private queueService: IQueueService,
                private eventService: IEventService) {}

    public start() {
        cron.schedule('* * * * *', () => {
            this.sendEmails().catch((err) => {
                    serviceErrorHandler(err)
                }
            );
        });
    }

    private async sendEmails(): Promise<void> {
        let emails: string[] = [];
        let rate: number = 0;

        try {
            rate = await this.rateService.getExchangeRate();
            emails = await this.userService.getAllUsersEmails();
        } catch (err) {
            serviceErrorHandler(err)
        }

        const emailText = this.rateEmailMessageConfig.textTemplate.replace('{rate}', String(rate));

        for (const email of emails) {

            const emailDetails: IEmailDetails = {
                from: this.rateEmailMessageConfig.sender,
                to: email,
                subject: this.rateEmailMessageConfig.subject,
                text: emailText,
            };

            const eventData: IEvent = {
                aggregateId: uuid(),
                eventType: 'PreparedEmail',
                timestamp: new Date().toString(),
                data: JSON.stringify(emailDetails)
            };

            await this.eventService.addEvent(eventData)
            await this.queueService.emitEvent(eventData)

        }
    }
}

export default new SchedulerService(userService, rateService, rateMessageConfig, rabbitService, eventService)
