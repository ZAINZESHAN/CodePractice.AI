import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Request } from 'express';
import { UserEntity } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guards';
import { Express } from 'express';

interface AuthRequest extends Request {
  user: UserEntity;
}

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: AuthRequest) {
    return this.profileService.getProfile(req.user.id);
  }

  @Patch('update')
  @UseGuards(JwtAuthGuard)
  updateProfile(@Req() req: AuthRequest, @Body() dto: UpdateProfileDto) {
    return this.profileService.updateProfile(req.user.id, dto);
  }

  @Post('upload-resume')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadResume(
    @Req() req: AuthRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const resumeUrl = `/uploads/${file.filename}`;
    return this.profileService.uploadResume(req.user.id, resumeUrl);
  }
}
