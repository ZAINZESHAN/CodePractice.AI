import { IsEmail, IsNotEmpty, MinLength, IsInt } from 'class-validator';

export class CreateCompanyUserDto {
  @IsInt()
  companyId: number;

  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
