import { Exclude, Expose, Transform } from "class-transformer";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Role } from "./role.entity";

@Entity({ name: 'users' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Unique(['email'])
    @Column()
    readonly email: string;

    @Unique(['username'])
    @Column()
    readonly username: string;

    @Column()
    readonly first_name: string;

    @Column()
    readonly last_name: string;

    @Exclude()
    @Column()
    password: string;

    @Column({ default: true })
    readonly is_active: boolean;

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

    constructor(partial: Partial<User>) {
        super();
        Object.assign(this, partial)
    }

    @Expose()
    get full_name(): string {
        return `${this.first_name} ${this.last_name}`
    }

    @Transform(({value}) => value ? value.role_name : value)
    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn({ name: 'role_id' })
    role: Role;

}