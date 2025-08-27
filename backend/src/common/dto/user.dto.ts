import { IsEmail, IsEnum, IsInt, IsOptional, IsString, Length } from "class-validator";
import { Role } from "@prisma/client";   // enum Role { ADMIN, STUDENT, COMPANY_ROOT, COMPANY_USER }

export class CreateUserDto {
  @IsString()
  @Length(3, 20)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 20)
  password: string;

  @IsEnum(Role, { message: "Invalid role" })
  role: Role;

  @IsOptional()
  @IsInt()
  companyId?: number;   // sirf company user ke liye zaroori
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(3, 20)
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsOptional()
  @IsInt()
  companyId?: number;
}
