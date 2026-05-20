import { BadRequestException, Controller, Get, HttpStatus, Logger, Param, Query, Redirect, Res, UseGuards } from '@nestjs/common';
import { GithubService } from './github.service';
import { AuthGuard } from 'src/common/auth.guard';
import { UserId } from 'src/common/user-id.decorator';
import type { Response } from 'express';
@Controller('github')
export class GithubController {
  private readonly logger: Logger = new Logger(GithubController.name);
  constructor(private readonly githubService: GithubService) {}

  @Get()
  githubLogin(@Res() res: Response) {
    const params = new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID!,
      redirect_uri: process.env.GITHUB_CALLBACK_URL!,
      scope: 'user:email read:user repo',
    });
    res.redirect(`https://github.com/login/oauth/authorize?${params}`);
  }
  @Get('callback')
  @UseGuards(AuthGuard)
  async githubCallback(@Query('code') code: string, @UserId() userId: string) {
    return await this.githubService.githubCallback(code, userId);
  }
  @Get('repos')
  @UseGuards(AuthGuard)
  async getRepos(@UserId() userId: string) {
    return await this.githubService.getGithubRepos(userId);
  }
  @Get('repos/:repo')
  @UseGuards(AuthGuard)
  async getRepo(@UserId() userId: string, @Param('repo') repo: string) {
    return await this.githubService.getGithubRepo(userId, repo);
  }
}
