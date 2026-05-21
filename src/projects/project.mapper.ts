import { ProjectEntity } from "src/database/entities/project.entity";
import { ProjectResponse } from "./project.response";
import { PaginatedResponse } from "src/common/api-response.dto";

export class ProjectMapper {
    static toListResponsePaginated(entities: ProjectEntity[], pagination: any): PaginatedResponse {
        return {
            ...pagination,
            data: entities.map((entity) => this.toResponse(entity))
        };
    }
    static toListResponse(entities: ProjectEntity[]): ProjectResponse[] {
        return entities.map((entity) => this.toResponse(entity));
    }
    static toResponse(entity: ProjectEntity): ProjectResponse {
        return {
            id: entity.id,
            userId: entity.userId,
            name: entity.name,
            description: entity.description,
            githubRepoUrl: entity.githubRepoUrl,
            createdAt: entity.createdAt,
        };
    }
}