import { IsNumber } from "class-validator";

export class PaginationQuery {
  @IsNumber()
  page: number = 1;
  @IsNumber()
  limit: number = 10;
}