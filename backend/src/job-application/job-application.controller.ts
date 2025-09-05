import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { JobApplicationService } from './job-application.service';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { Request } from 'express';
import { UserEntity } from 'src/users/entities/user.entity';

interface AuthRequest extends Request {
  user: UserEntity;
}

@Controller('applications')
export class JobApplicationController {
  constructor(private jobAppService: JobApplicationService) {}

  @Post('apply')
  applyJob(@Req() req: AuthRequest, @Body() body: CreateJobApplicationDto) {
    return this.jobAppService.applyJob(req.user.id, body);
  }

  @Get('my')
  getMyApplications(@Req() req: AuthRequest) {
    return this.jobAppService.getMyApplications(req.user.id);
  }

  @Get('job/:id')
  getApplicants(@Req() req: AuthRequest, @Param('id') jobId: string) {
    return this.jobAppService.getApplicants(
      Number(req.user.companyId),
      Number(jobId),
    );
  }

  @Patch(':id/status')
  updateStatus(
    @Req() req: AuthRequest,
    @Param('id') appId: string,
    @Body() body: UpdateJobApplicationDto,
  ) {
    return this.jobAppService.updateStatus(
      Number(req.user.companyId),
      Number(appId),
      body,
    );
  }
}
