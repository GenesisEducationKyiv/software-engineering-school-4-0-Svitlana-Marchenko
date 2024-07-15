import 'reflect-metadata'
import { DataSource } from 'typeorm'
import {Customer} from "../entities/customer.entity";


export const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: 'root',
    database: 'user',
    entities: [Customer],
    synchronize: false,
    migrations: ['src/migrations/*.ts'],
    migrationsTableName: 'migrations',
    logging: false,
})

//ps hardcode val from .env is not good practice :(
