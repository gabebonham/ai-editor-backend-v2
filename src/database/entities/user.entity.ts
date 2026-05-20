import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity('users')
export class UserEntity extends BaseEntity {
    @Column()
    username!: string;
    @Column()
    email!: string;
    @Column()
    password!: string;
    @Column({ nullable: true })
    github_token?: string;
    @Column({ nullable: true })
    github_name?: string;
    @Column({ nullable: true })
    github_email?: string;
    @Column({ nullable: true })
    github_login?: string;
}