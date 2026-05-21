import { Injectable } from "@nestjs/common";
import { UserEntity } from "../entities/user.entity";
import { BaseRepository } from "./base.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
    constructor(
        @InjectRepository(UserEntity)
        repository: Repository<UserEntity>,
    ) {
        super(repository);
    }
    async findByEmailAndPassword(email: string, password: string): Promise<UserEntity | null> {
        return this.repository.findOne({
            where: { email, password },
        });
    }
    async findByEmail(email: string): Promise<UserEntity | null> {
        return this.repository.findOne({
            where: { email },
        });
    }
}