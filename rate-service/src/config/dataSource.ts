import 'reflect-metadata'
import { DataSource } from 'typeorm'
import {Rate} from "../entity/rate.entity";

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5435,
    username: 'root',
    password: 'root',
    database: 'rate_service',
    entities: [Rate],
    synchronize: false,
    migrations: ['src/migrations/*.ts'],
    migrationsTableName: 'migrations',
    logging: false,
})

//ps hardcode val from .env is not good practice :(
