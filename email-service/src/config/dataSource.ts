import 'reflect-metadata'
import { DataSource } from 'typeorm'
import {Email} from "../entity/email.enitity";

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5434,
    username: 'root',
    password: 'root',
    database: 'email',
    entities: [Email],
    synchronize: false,
    migrations: ['src/migrations/*.ts'],
    migrationsTableName: 'migrations',
    logging: false,
})

//ps hardcode val from .env is not good practice :(
