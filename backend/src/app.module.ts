import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { JobModule } from './job/job.module';
import { JobApplicationModule } from './job-application/job-application.module';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    CompanyModule,
    JobModule,
    JobApplicationModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
