import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProjectEntity } from "../entities/project.entity";
import { PaginatedResponse } from "src/common/api-response.dto";

@Injectable()
export class ProjectRepository extends BaseRepository<ProjectEntity> {
    constructor(
        @InjectRepository(ProjectEntity)
        repository: Repository<ProjectEntity>,
    ) {
        super(repository);
    }
    async findAllByUserIdPaginated(userId: string, page = 1, limit = 10): Promise<PaginatedResponse> {
        return this.findAllPaginated(page, limit, {
            where: { userId },
        });
    }
}