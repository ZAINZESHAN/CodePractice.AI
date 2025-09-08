import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JobApplicationService } from './job-application.service';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { Request } from 'express';
import { UserEntity } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guards';
import { RolesGuard } from 'src/guards/roles.guards';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

interface AuthRequest extends Request {
  user: UserEntity;
}

@Controller('applications')
export class JobApplicationController {
  constructor(private jobAppService: JobApplicationService) {}

  // ✅ STUDENT: Apply for a job
  @Post('apply')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.STUDENT)
  applyJob(@Req() req: AuthRequest, @Body() body: CreateJobApplicationDto) {
    return this.jobAppService.applyJob(req.user.id, body);
  }

  // ✅ STUDENT: Get my applications
  @Get('my')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.STUDENT)
  getMyApplications(@Req() req: AuthRequest) {
    return this.jobAppService.getMyApplications(req.user.id);
  }

  // ✅ COMPANY_ROOT & COMPANY_USER: Get applicants for job
  @Get('job/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.COMPANY_ROOT, Role.COMPANY_USER)
  getApplicants(@Req() req: AuthRequest, @Param('id') jobId: string) {
    return this.jobAppService.getApplicants(
      // eslint-disable-next-line @typescript-eslint/unbound-method
      Number(req.user.companyId),
      Number(jobId),
    );
  }

  // ✅ COMPANY_ROOT & COMPANY_USER: Update applicant status
  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.COMPANY_ROOT, Role.COMPANY_USER)
  updateStatus(
    @Req() req: AuthRequest,
    @Param('id') appId: string,
    @Body() body: UpdateJobApplicationDto,
  ) {
    return this.jobAppService.updateStatus(
      // eslint-disable-next-line @typescript-eslint/unbound-method
      Number(req.user.companyId),
      Number(appId),
      body,
    );
  }
}
