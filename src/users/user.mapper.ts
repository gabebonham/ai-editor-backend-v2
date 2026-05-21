import { UserEntity } from "src/database/entities/user.entity";
import { UserResponse } from "./user.response";
import { PaginatedResponse } from "src/common/api-response.dto";

export class UserMapper {
    static toListResponsePaginated(entities: UserEntity[], pagination: any): PaginatedResponse {
        return {
            ...pagination,
            data: entities.map((entity) => this.toResponse(entity))
        };
    }
    static toListResponse(entities: UserEntity[]): UserResponse[] {
        return entities.map((entity) => this.toResponse(entity));
    }
    static toResponse(entity: UserEntity): UserResponse {
        return {
            id: entity.id,
            username: entity.username,
            email: entity.email,
            createdAt: entity.createdAt,
        };
    }
}