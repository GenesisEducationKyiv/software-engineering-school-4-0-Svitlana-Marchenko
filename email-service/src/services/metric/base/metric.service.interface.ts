import { Registry } from 'prom-client';

export interface IMetricsService {
    incrementCounter(counterName: string, labels?: Record<string, string>): void;
    setGauge(gaugeName: string, value: number, labels?: Record<string, string>): void;
    getMetrics(): Promise<string>;
    resetDailyCounters(): void;
    getRegister(): Registry;
}

