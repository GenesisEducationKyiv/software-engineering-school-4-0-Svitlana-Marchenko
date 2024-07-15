import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class UserEntityWithSubscriptionType1720355907923 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("user", new TableColumn({
            name: "subscriptionType",
            type: "enum",
            enum: ["Cancelled", "Active"],
            default: "'Active'",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("user", "subscriptionType");
    }

}
