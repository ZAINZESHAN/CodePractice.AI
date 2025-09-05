import { IsEnum, IsOptional } from 'class-validator';
import { ApplicationStatus } from '@prisma/client';

export class UpdateJobApplicationDto {
  @IsOptional()
  @IsEnum(ApplicationStatus as object)
  status?: ApplicationStatus;
}
