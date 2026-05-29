import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { UserEntity } from "./user.entity";

@Entity('projects')
export class ProjectEntity extends BaseEntity {

    @Column()
    name!: string;

    @Column({ nullable: true })
    html?: string;

    @Column({ nullable: true })
    description?: string;
    
    @Column({ name: 'user_id' })
    userId!: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user!: UserEntity;

    @Column({ name: 'github_repo_url', nullable:true })
    githubRepoUrl?: string;

    @Column({ name: 'md_file_url',nullable: true })
    mdFileUrl?: string;
}