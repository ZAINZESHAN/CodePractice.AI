import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserEntity } from './entities/user.entity';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  //Get all users:
  async getAllUsers(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    return users;
  }

  //Get only students:
  async getAllStudents(): Promise<UserEntity[]> {
    const students = await this.prisma.user.findMany({
      where: { role: Role.STUDENT },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    return students;
  }

  //Get all companies (Company table)
  async getAllCompanies() {
    const companies = this.prisma.company.findMany({
      include: {
        users: true,
      },
    });
    return companies;
  }

  // Company Users by Role
  async getAllCompanyUsers(currentUser: {
    id: number;
    role: Role;
    companyId?: number;
  }): Promise<UserEntity[]> {
    if (currentUser.role === Role.COMPANY_ROOT) {
      // Sirf apni company ke users
      const users = await this.prisma.user.findMany({
        where: {
          companyId: currentUser.companyId,
          role: Role.COMPANY_USER,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });
      return users;
    } else if (currentUser.role === Role.ADMIN) {
      // Admin chahe to sab dekh sakta hai
      const users = await this.prisma.user.findMany({
        where: {
          OR: [{ role: Role.COMPANY_ROOT }, { role: Role.COMPANY_USER }],
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          companyId: true,
          createdAt: true,
        },
      });
      return users as UserEntity[];
    } else {
      throw new ForbiddenException('You do not have access to company users');
    }
  }

  async deleteCompanyUser(
    userIdToDelete: number,
    currentUser: { id: number; role: Role; companyId?: number },
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id: userIdToDelete },
    });

    if (!user) throw new Error('User not found');

    // Agar COMPANY_ROOT hai, to sirf apni company ke users delete kar sakta hai
    if (
      currentUser.role === Role.COMPANY_ROOT &&
      user.companyId !== currentUser.companyId
    ) {
      throw new ForbiddenException(
        "You can't delete users from another company",
      );
    }

    return await this.prisma.user.delete({
      where: { id: user.id },
    });
  }

  async deleteStudent(userIdToDelete: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userIdToDelete },
    });
    if (!user) throw new Error('User not found');

    // delete related job applications first
    await this.prisma.jobApplication.deleteMany({
      where: { studentId: userIdToDelete },
    });

    // then delete the student
    return this.prisma.user.delete({
      where: { id: userIdToDelete },
    });
  }
}
