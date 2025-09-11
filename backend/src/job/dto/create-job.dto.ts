import { IsString, IsOptional, Length } from 'class-validator';

export class CreateJobDto {
  @IsString()
  @Length(3, 100, { message: "Job title must be between 3 and 100 characters" })
  title: string;

  @IsString()
  @Length(10, 2000, { message: "Description must be between 10 and 2000 characters" })
  description: string;

  @IsOptional()
  @IsString()
  @Length(2, 100, { message: "Location must be between 2 and 100 characters" })
  location?: string;
}
