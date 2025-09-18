import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async updateProfile(userId: number, dto: UpdateProfileDto): Promise<any> {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        location: dto.location,
        interest: dto.interest,
      },
    });
  }

  async getProfile(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
}
