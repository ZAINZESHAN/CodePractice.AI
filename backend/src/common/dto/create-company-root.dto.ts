import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateCompanyRootDto {
  @IsNotEmpty()
  companyName: string;

  description?: string;

  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
