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
    @Column({ nullable: true, name: 'github_token' })
    githubToken?: string;
    @Column({ nullable: true, name: 'github_name' })
    githubName?: string;
    @Column({ nullable: true, name: 'github_email' })
    githubEmail?: string;
    @Column({ nullable: true, name: 'github_login' })
    githubLogin?: string;
    @Column({ nullable: true, name: 'anthropic_key' })
    anthropicKey?: string;
}