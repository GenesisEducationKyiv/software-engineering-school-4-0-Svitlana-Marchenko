import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Event } from '../entity/event.entity'

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'root',
    password: 'root',
    database: 'event',
    entities: [Event],
    synchronize: false,
    migrations: ['src/migrations/**/*.ts'],
    migrationsTableName: 'migrations',
    logging: false,
})

//ps hardcode val from .env is not good practice :(
