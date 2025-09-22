import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateCompanyRootDto {
  @IsString({ message: 'Name must be a valid string' })
  @Length(3, 30, {
    message: 'Name must be between 3 and 30 characters',
  })
  name: string;

  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;

  @IsString({ message: 'Password must be a valid string' })
  @Length(6, 20, {
    message: 'Password must be between 6 and 20 characters',
  })
  password: string;

  @IsString({ message: 'Company name must be a valid string' })
  @Length(2, 50, {
    message: 'Company name must be between 2 and 50 characters',
  })
  companyName: string;

  @IsOptional()
  @IsString({ message: 'Description must be a valid string' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'Website must be a valid URL string' })
  @Matches(/^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/, {
    message: 'Please enter a valid website URL',
  })
  website?: string;

  @IsOptional()
  @IsString({ message: 'Location must be a valid string' })
  location?: string;
}
