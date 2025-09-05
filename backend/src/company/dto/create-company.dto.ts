// create-company.dto.ts
import { IsString, Length, IsOptional } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @Length(3, 50)
  name: string;

  @IsOptional()
  @IsString()
  @Length(0, 200)
  description?: string;
}
