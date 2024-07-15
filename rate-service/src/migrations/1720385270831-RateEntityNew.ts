import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class RateEntityNew1720385270831 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "rate",
            columns: [
                {
                    name: 'id',
                    type: 'text',
                    isPrimary: true,
                },
                {
                    name: "rate",
                    type: "decimal",
                    precision: 5,
                    scale: 2,
                    isNullable: false,
                },
                {
                    name: "date",
                    type: "date",
                    isNullable: false,
                },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("rate");
    }

}
