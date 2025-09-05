import { Role } from '@prisma/client';
import { UpdateJobApplicationDto } from 'src/job-application/dto/update-job-application.dto';

export class UserEntity {
  companyId(companyId: any, arg1: number, body: UpdateJobApplicationDto) {
    throw new Error('Method not implemented.');
  }
  id: number;
  name: string | null;
  email: string;
  role: Role;
  createdAt: Date;
}
