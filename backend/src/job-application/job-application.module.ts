import { Module } from '@nestjs/common';
import { JobApplicationService } from './job-application.service';
import { JobApplicationController } from './job-application.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [JobApplicationController],
  providers: [JobApplicationService, PrismaService],
})
export class JobApplicationModule {}
