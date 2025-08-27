import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserEntity } from '../entities/user.entity';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    //Get all users:
    async getAllUsers(): Promise<UserEntity[]> {
        const users = await this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true
            }
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
                createdAt: true
            }
        })
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

    //Get all company users (Root + Employees)
    async getAllCompanyUsers(): Promise<UserEntity[]> {
        const companyUsers = this.prisma.user.findMany({
            where: {
                OR: [
                    { role: Role.COMPANY_ROOT },
                    { role: Role.COMPANY_USER },
                ],
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });
        return companyUsers;
    }

    //Get all admins
    async getAllAdmins(): Promise<UserEntity[]> {
        const admins = this.prisma.user.findMany({
            where: { role: Role.ADMIN },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });
        return admins;
    }
}
