import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Customer1721077364523 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'customer',
                columns: [
                    {
                        name: 'id',
                        type: 'text',
                        isPrimary: true,
                    },
                    {
                        name: 'email',
                        type: 'text',
                    },
                ],
            }),
            true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('customer')
    }

}
