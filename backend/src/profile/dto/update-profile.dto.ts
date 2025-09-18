import { IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  interest?: string;
}
