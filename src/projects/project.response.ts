export interface ProjectResponse {
    id: string;
    userId: string;
    name: string;
    description?: string;
    githubRepoUrl?: string;
    html?: string;
    mdFileUrl?: string;
    createdAt: Date;
}