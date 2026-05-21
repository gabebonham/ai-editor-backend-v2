import { Repository, FindOptionsWhere, DeepPartial, FindManyOptions } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';
import { PaginatedResponse } from '../../common/api-response.dto';

export abstract class BaseRepository<T extends BaseEntity> {
  constructor(protected readonly repository: Repository<T>) {}

    async findAllPaginated(
        page = 1,
        limit = 10,
        options?: FindManyOptions<T>,
    ): Promise<PaginatedResponse> {
        const [data, total] = await this.repository.findAndCount({
        ...options,
        skip: (page - 1) * limit,
        take: limit,
        });

        const totalPages = Math.ceil(total / limit);

        return new PaginatedResponse(
            data,
            totalPages,
            page,
            limit,
        );
    }

    async findById(id: string): Promise<T | null> {
        return this.repository.findOne({
        where: { id } as FindOptionsWhere<T>,
        });
    }

    async create(data: DeepPartial<T>): Promise<T> {
        const entity = this.repository.create(data);
        return this.repository.save(entity);
    }
    async delete(id: string): Promise<T> {
        const entity = await this.findById(id);
        await this.repository.delete(id);
        return entity!;
    }
    async update(id: string, data: DeepPartial<T>): Promise<T> {
        await this.repository.update(id, data as any);
        return this.findById(id) as Promise<T>;
    }
}