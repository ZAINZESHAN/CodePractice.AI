import {
  Body,
  Controller,
  Get,
  Patch,
  // Post,
  Req,
  // UploadedFile,
  UseGuards,
  // UseInterceptors,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Request } from 'express';
import { UserEntity } from 'src/users/entities/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { File as MulterFile } from 'multer';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guards';
import { RolesGuard } from 'src/guards/roles.guards';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

interface AuthRequest extends Request {
  user: UserEntity;
}

@Controller('profile')
@UseGuards(JwtAuthGuard, RolesGuard) // sab endpoints protected
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  // All roles can view their own profile
  @Get('me')
  @Roles(Role.STUDENT, Role.COMPANY_ROOT, Role.COMPANY_USER, Role.ADMIN)
  getProfile(@Req() req: AuthRequest) {
    return this.profileService.getProfile(req.user.id);
  }

  // All roles can update their own profile
  @Patch('update')
  @Roles(Role.STUDENT, Role.COMPANY_ROOT, Role.COMPANY_USER, Role.ADMIN)
  updateProfile(@Req() req: AuthRequest, @Body() dto: UpdateProfileDto) {
    return this.profileService.updateProfile(req.user.id, dto);
  }

  // // Only STUDENT can upload resume
  // @Post('upload-resume')
  // @UseInterceptors(FileInterceptor('file'))
  // @Roles(Role.STUDENT)
  // uploadResume(@Req() req: AuthRequest, @UploadedFile() file: MulterFile) {
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  //   const resumeUrl = `/uploads/${file.filename}`;
  //   return this.profileService.uploadResume(req.user.id, resumeUrl);
  // }
}
