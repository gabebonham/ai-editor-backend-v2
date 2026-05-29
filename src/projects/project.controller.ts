import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query, Res, StreamableFile, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { PaginatedResponse } from '../common/api-response.dto';
import { PaginationQuery } from '../common/pagination.query';
import { ProjectService } from './project.service';
import { UserId } from 'src/common/user-id.decorator';
import { CreateProjectRequest } from './create-project.request';
import { AuthGuard } from 'src/common/auth.guard';
import { UpdateProjectRequest } from './update-project.request';
import { ProjectEntity } from 'src/database/entities/project.entity';
import { ProjectResponse } from './project.response';
import { ProjectMapper } from './project.mapper';
import { FileInterceptor } from '@nestjs/platform-express';
import type  { Response } from 'express';
@Controller('projects')
export class ProjectController {
  private readonly logger: Logger = new Logger(ProjectController.name);
  constructor(private readonly projectService: ProjectService) { }

  @Get()
  @UseGuards(AuthGuard)
  async getPaginatedByUserId(@Query() query: PaginationQuery, @UserId() userId: string): Promise<PaginatedResponse> {
    const result = await this.projectService.getPaginatedByUserId(query, userId);
    return ProjectMapper.toListResponsePaginated(result.data, result);
  }
  @Post()
  @UseGuards(AuthGuard)
  async createProject(
    @UserId() userId: string,
    @Body() body: CreateProjectRequest,
  ): Promise<ProjectResponse> {
    const entity = await this.projectService.createProject(userId, body);
    return ProjectMapper.toResponse(entity);
  }
  @Patch(':id')
  @UseGuards(AuthGuard)
  async updateProject(
    @Param('id') id: string,
    @Body() body: Partial<UpdateProjectRequest>,
  ): Promise<ProjectResponse> {
    const entity = await this.projectService.updateProject(id, body);
    return ProjectMapper.toResponse(entity);
  }
  @Get(':id')
  @UseGuards(AuthGuard)
  async getProjectById(@Param('id') id: string): Promise<ProjectResponse> {
    const entity = await this.projectService.getProjectById(id);
    return ProjectMapper.toResponse(entity);
  }
  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteProject(@Param('id') id: string): Promise<ProjectResponse> {
    const entity = await this.projectService.deleteProject(id);
    return ProjectMapper.toResponse(entity);
  }
  @Post(':id/md-file')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadMdFile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ProjectResponse> {
    const entity = await this.projectService.uploadMdFile(id, file);
    return ProjectMapper.toResponse(entity);
  }
  @Get(':id/md-file')
  @UseGuards(AuthGuard)
  async getMdFile(
    @Param('id') id: string,
    @Res() res: any,
  ) {
    const { stream, filename } = await this.projectService.getMdFile(id);

    res.set({
      'Content-Type': 'text/markdown',
      'Content-Disposition': `attachment; filename="${filename}"`,
    });

    stream.pipe(res);
  }
}
