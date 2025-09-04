import { IsString, IsOptional, Length } from 'class-validator';

export class CreateJobDto {
  @IsString()
  @Length(3, 100)
  title: string;

  @IsString()
  @Length(10, 2000)
  description: string;

  @IsOptional()
  @IsString()
  @Length(2, 100)
  location?: string;
}
