import { IsEnum } from 'class-validator';
import { CompanyStatus } from '@prisma/client';

export class UpdateCompanyStatusDto {
  @IsEnum(CompanyStatus as object, {
    message: 'Status must be PENDING, APPROVED or REJECTED',
  })
  status: CompanyStatus;
}
