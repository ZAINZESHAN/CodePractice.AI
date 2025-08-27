import { Role } from '@prisma/client';

export class UserEntity {
  id: number;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
}