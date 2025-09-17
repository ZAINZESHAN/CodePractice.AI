import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { Request } from 'express';
import { UserEntity } from 'src/users/entities/user.entity';
import { RolesGuard } from 'src/guards/roles.guards';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guards';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

interface AuthRequest extends Request {
  user: UserEntity;
}

@Controller('job')
export class JobController {
  constructor(private jobService: JobService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.COMPANY_ROOT, Role.COMPANY_USER)
  createJob(@Req() req: AuthRequest, @Body() body: CreateJobDto) {
    return this.jobService.createJob(req.user.id, body);
  }

  @Get('all')
  listAllJobs() {
    return this.jobService.listAllJobs();
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.COMPANY_ROOT, Role.ADMIN)
  listJobs(@Req() req: AuthRequest) {
    return this.jobService.listJobs(req.user.id);
  }

  @Get(':id')
  getJobById(@Req() req: AuthRequest, @Param('id') id: string) {
    return this.jobService.getJobById(req.user.id, Number(id));
  }

  @Patch('update/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.COMPANY_ROOT, Role.ADMIN)
  updateJObById(
    @Req() req: AuthRequest,
    @Param('id') id: string,
    @Body() body: CreateJobDto,
  ) {
    return this.jobService.updateJobById(req.user.id, Number(id), body);
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.COMPANY_ROOT)
  deleteJobById(@Req() req: AuthRequest, @Param('id') id: string) {
    return this.jobService.deleteJobById(req.user.id, Number(id));
  }
}
