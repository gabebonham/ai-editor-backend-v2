import { IsOptional, IsString } from "class-validator";

export class CreateProjectRequest {
    @IsString()
    name!: string;
    @IsString()
    @IsOptional()
    description?: string;
    @IsString()
    @IsOptional()
    githubRepoUrl?: string;
}