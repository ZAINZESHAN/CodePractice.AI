import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { JobModule } from './job/job.module';

@Module({
  imports: [UsersModule, AuthModule, CompanyModule, JobModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
