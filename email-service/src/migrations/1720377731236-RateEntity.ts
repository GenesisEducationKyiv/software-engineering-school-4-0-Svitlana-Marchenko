import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class RateEntity1720377731236 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "rate",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
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
                    type: "timestamp",
                    isNullable: false,
                },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("rate");
    }

}
