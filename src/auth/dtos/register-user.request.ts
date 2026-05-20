import { IsString } from "class-validator";

export class RegisterUserRequest {
  @IsString()
  username!: string;
  @IsString()
  password!: string;
  @IsString()
  email!: string;
}