import { IsOptional, IsString } from "class-validator";

export class ClaudeAskRequest {
    @IsString()
    prompt!: string;
    
    @IsString()
    @IsOptional()
    projectId?: string;
    
    @IsString()
    @IsOptional()
    htmlSrc?: string;
}