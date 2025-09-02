import { Role } from '@prisma/client';

export class UserEntity {
  id: number;
  name: string | null;
  email: string;
  role: Role;
  createdAt: Date;
}
