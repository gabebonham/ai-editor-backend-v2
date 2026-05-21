import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { UserService } from 'src/users/user.service';

@Injectable()
export class GithubService {
  private readonly logger: Logger = new Logger(GithubService.name);
  private readonly GITHUB_API = 'https://api.github.com';
  private readonly GITHUB_OAUTH = 'https://github.com';  
  constructor(private readonly http: HttpService, private readonly userService: UserService) {}

  async githubCallback(code: string, userId: string) {
    const access_token = await this.fetchToken(code);
    const userData = await this.fetchUserData(access_token);
    await this.saveGithubData(userData, userId, access_token);
  }

  async getScript(userId: string, projectId: string): Promise<void> {

  }

  async fetchToken(code: string): Promise<string> {
    const tokenRes = await firstValueFrom(this.http.post(
      this.GITHUB_OAUTH + '/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: { Accept: 'application/json' },
      },
    ));
    const { access_token, error } = tokenRes.data;

    if (error || !access_token) {
      throw new BadRequestException('Failed to obtain access token from GitHub.');
    }

    return access_token;
  }

  async fetchUserData(access_token: string): Promise<any> {
    const userRes = await firstValueFrom(this.http.get(
      this.GITHUB_API + '/user',
      {
        headers: { Authorization: `token ${access_token}` },
      },
    ));
    return userRes.data;
  }

  async saveGithubData(userData: any, userId: string, access_token: string): Promise<void> {
    if (!userData || !access_token || !userData.login) {
      throw new BadRequestException('Invalid user data received from GitHub.');
    }
    await this.userService.update(userId, {
      githubToken: access_token,
      githubName: userData.name,
      githubEmail: userData.email,
      githubLogin: userData.login,
    });
  }

  async getGithubRepos(userId: string): Promise<any[]> {
    const user = await this.userService.getById(userId);
    if (!user.githubToken) {
      throw new BadRequestException('User has not linked their GitHub account.');
    }
    const reposRes = await firstValueFrom(this.http.get(
      this.GITHUB_API + '/user/repos',
      {
        headers: { Authorization: `token ${user.githubToken}` },
      },
    ));
    return reposRes.data;
  }

  async getGithubRepo(userId: string, repo: string): Promise<any> {
    const user = await this.userService.getById(userId);
    if (!user.githubToken) {
      throw new BadRequestException('User has not linked their GitHub account.');
    }
    const repoRes = await firstValueFrom(this.http.get(
      this.GITHUB_API + `/repos/${user.githubLogin}/${repo}`,
      {
        headers: { Authorization: `token ${user.githubToken}` },
      },
    ));
    return repoRes.data;
  }
}
