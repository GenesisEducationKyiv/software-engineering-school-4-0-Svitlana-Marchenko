import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class EmailEntity1720366372031 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'email',
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
        await queryRunner.dropTable('email')
    }

}
