import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: 'roles' })
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Unique(['role_name'])
    @Column()
    readonly role_name: string;

    @CreateDateColumn({
        default: 'now()',
        nullable: true
    })
    readonly created_at: string;

    @UpdateDateColumn({
        default: 'now()',
        nullable: true
    })
    readonly updated_at: string

    constructor(partial: Partial<Role>) {
        super();
        Object.assign(this, partial)
    }

    @OneToMany(() => User, (user) => user.role)
    users: User[]
}