import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { Request } from 'express';
import { UserEntity } from 'src/users/entities/user.entity';

interface AuthRequest extends Request {
  user: UserEntity;
}

@Controller('job')
export class JobController {
  constructor(private jobService: JobService) {}

  @Post('create')
  createJob(@Req() req: AuthRequest, @Body() body: CreateJobDto) {
    return this.jobService.createJob(req.user.id, body);
  }

  @Get()
  listJobs(@Req() req: AuthRequest) {
    return this.jobService.listJobs(req.user.id);
  }

  @Get(':id')
  getJobById(@Req() req: AuthRequest, @Param('id') id: string) {
    return this.jobService.getJobById(req.user.id, Number(id));
  }

  @Patch('update/:id')
  updateJObById(
    @Req() req: AuthRequest,
    @Param('id') id: string,
    @Body() body: CreateJobDto,
  ) {
    return this.jobService.updateJobById(req.user.id, Number(id), body);
  }

  @Delete('delete/:id')
  deleteJobById(@Req() req: AuthRequest, @Param('id') id: string) {
    return this.jobService.deleteJobById(req.user.id, Number(id));
  }
}
