import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUsersTable1672197301777 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true
                },
                {
                    name: 'username',
                    type: 'varchar',
                    isUnique: true
                },
                {
                    name: 'first_name',
                    type: 'varchar'
                },
                {
                    name: 'last_name',
                    type: 'varchar'
                },
                {
                    name: 'password',
                    type: 'varchar'
                },
                {
                    name: 'is_active',
                    type: 'tinyInt'
                },
                {
                    name: 'created_at',
                    type: 'datetime',
                    default: 'now()',
                    isNullable: true,
                },
                {
                    name: 'updated_at',
                    type: 'datetime',
                    default: 'now()',
                    isNullable: true,
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
