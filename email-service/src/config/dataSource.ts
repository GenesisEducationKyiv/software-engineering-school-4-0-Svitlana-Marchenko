import 'reflect-metadata'
import { DataSource } from 'typeorm'
import {Email} from "../entity/email.enitity";
import {Rate} from "../entity/rate.entity";

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5434,
    username: 'root',
    password: 'root',
    database: 'email_service',
    entities: [Email, Rate],
    synchronize: false,
    migrations: ['src/migrations/*.ts'],
    migrationsTableName: 'migrations',
    logging: false,
})

//ps hardcode val from .env is not good practice :(
