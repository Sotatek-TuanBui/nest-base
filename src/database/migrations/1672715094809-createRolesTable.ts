import { Role } from "../../entities/role.entity";
import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm"

export class createRolesTable1672715094809 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'roles',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'role_name',
                    type: 'varchar',
                    isUnique: true
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
        }));

        await queryRunner.addColumn('users', new TableColumn({
            name: 'role_id',
            type: 'int',
            default: '1',
        }));

        const listRoles = ['guess', 'user', 'admin'];

        listRoles.forEach(async (role) => {
            await queryRunner.manager.save(
                await queryRunner.manager.create<Role>(Role, {
                    role_name: role
                })
            );
        })

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('roles');
        await queryRunner.dropColumn('users', 'role_id');
    }

}
