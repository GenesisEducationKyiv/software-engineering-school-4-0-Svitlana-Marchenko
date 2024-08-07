import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class User1718351509344 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: 'user',
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
         true,
      )
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('user')
   }
}
