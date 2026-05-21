import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { GithubModule } from './github/github.module';
import { CommonModule } from './common/common.module';
import { ProjectModule } from './projects/project.module';
import { ClaudeModule } from './claude/claude.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule, 
    UserModule, 
    DatabaseModule, 
    GithubModule,
    CommonModule,
    ProjectModule,
    ClaudeModule
  ],
  providers: [],
})
export class AppModule {}
