export class ApiResponseDto<T> {
    constructor(success: boolean, message: string | string[], data?: T) {
        this.success = success;
        this.message = message;
        if (!!data) {
            this.data = data;
        }
        if (!message) {
            this.message = 'No message provided.';
        }
    }
    success: boolean;
    message: string | string[];
    data?: T;
}
export class PaginatedResponse {
    constructor(data: any[], total: number, page: number, limit: number) {
        this.data = data;
        this.total = total;
        this.page = page;
        this.limit = limit;
        this.totalPages = Math.ceil(total / limit);
        this.hasNextPage = page < this.totalPages;
        this.hasPreviousPage = page > 1;
    }
    data: any[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    mapDataToResponse(mapper: (item: any) => any): PaginatedResponse {
        this.data = this.data.map(mapper);
        return this;
    }
}
