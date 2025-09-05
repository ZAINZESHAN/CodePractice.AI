import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateCompanyRootDto {
  @IsString()
  @Length(3, 30)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 20)
  password: string;

  @IsString()
  @Length(2, 50)
  companyName: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsString()
  location?: string;
}
