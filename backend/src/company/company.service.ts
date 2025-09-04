import { Injectable, NotAcceptableException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async getMyCompany(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        company: {
          include: {
            users: true,
          },
        },
      },
    });
    if (!user?.company) throw new NotAcceptableException('Company not found');
    return user.company;
  }
}
