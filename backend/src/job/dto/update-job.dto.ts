import { IsString, IsOptional, Length, Min, IsIn, IsInt } from 'class-validator';

export class UpdateJobDto {
  @IsOptional()
  @IsString()
  @Length(3, 100)
  title?: string;

  @IsOptional()
  @IsString()
  @Length(10, 2000)
  description?: string;

  @IsInt()
  @Min(0)
  salary?: number;

  @IsOptional()
  @IsString()
  @Length(2, 100)
  location?: string;
}
