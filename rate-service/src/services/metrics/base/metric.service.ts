import client, {Registry} from 'prom-client';
import cron from 'node-cron';
import {IMetricsService} from "./metric.service.interface";

const register = new client.Registry();

export class MetricsService implements IMetricsService {
    private counters: Record<string, client.Counter<string>> = {};
    private gauges: Record<string, client.Gauge<string>> = {};

    private dailyCounters: Record<string, number> = {};

    constructor() {
        cron.schedule('0 0 * * *', () => {
            this.resetDailyCounters();
        });
    }

    incrementCounter(counterName: string, labels?: Record<string, string>): void {
        if (!this.counters[counterName]) {
            this.counters[counterName] = new client.Counter({
                name: counterName,
                help: `Total number of ${counterName} calls`,
                labelNames: labels ? Object.keys(labels) : [],
            });
            register.registerMetric(this.counters[counterName]);
        }
        this.counters[counterName].inc(labels);

        const dailyCounterName = `daily_${counterName}`;
        if (!this.dailyCounters[dailyCounterName]) {
            this.dailyCounters[dailyCounterName] = 0;
        }
        this.dailyCounters[dailyCounterName]++;
    }

    setGauge(gaugeName: string, value: number, labels?: Record<string, string>): void {
        if (!this.gauges[gaugeName]) {
            this.gauges[gaugeName] = new client.Gauge({
                name: gaugeName,
                help: `Value of ${gaugeName}`,
                labelNames: labels ? Object.keys(labels) : [],
            });
            register.registerMetric(this.gauges[gaugeName]);
        }
        this.gauges[gaugeName].set(labels || {}, value);
    }

    async getMetrics(): Promise<string> {
        return await register.metrics();
    }

    resetDailyCounters(): void {
        for (const key in this.dailyCounters) {
            this.setGauge(key, this.dailyCounters[key]);
            this.dailyCounters[key] = 0;
        }
    }

    getRegister(): Registry {
        return register;
    }
}

export default new MetricsService();
