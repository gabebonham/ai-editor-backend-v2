import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PaginatedResponse } from 'src/common/api-response.dto';
import { PaginationQuery } from 'src/common/pagination.query';
import { ProjectRepository } from 'src/database/repositories/project.repository';
import { CreateProjectRequest } from './create-project.request';
import { ProjectEntity } from 'src/database/entities/project.entity';
import { UpdateProjectRequest } from './update-project.request';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}
  async getPaginatedByUserId(dto: PaginationQuery, userId: string): Promise<PaginatedResponse> {
    return await this.projectRepository.findAllByUserIdPaginated(userId, dto.page, dto.limit);
  }

  async createProject(userId: string, data: Partial<CreateProjectRequest>): Promise<ProjectEntity> {
    if (!userId) {
      throw new BadRequestException('User ID is required to create a project.');
    }
    if (!data.name) {
      throw new BadRequestException('Project name is required.');
    }
    return await this.projectRepository.create({ userId, ...data });
  }

  async getProjectById(id: string): Promise<ProjectEntity> {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new NotFoundException('Project not found.');
    }
    return project;
  }

  async updateProject(id: string, data: Partial<UpdateProjectRequest>): Promise<ProjectEntity> {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new NotFoundException('Project not found.');
    }
    return await this.projectRepository.update(id, { ...project, ...data });
  }

  async deleteProject(id: string): Promise<ProjectEntity> {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new NotFoundException('Project not found.');
    }
    return await this.projectRepository.delete(id);
  }
}
