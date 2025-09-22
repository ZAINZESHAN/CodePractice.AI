import { IsEmail, IsNotEmpty, MinLength, IsInt } from 'class-validator';

export class CreateCompanyUserDto {
  @IsInt({ message: 'Company ID must be a valid number' })
  companyId: number;

  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;

  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
