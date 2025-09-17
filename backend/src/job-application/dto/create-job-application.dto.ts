import { IsInt, IsString } from 'class-validator';

export class CreateJobApplicationDto {
  @IsInt()
  jobId: number;

  @IsString()
  phoneNumber: string;

  @IsString()
  resumeUrl: string;
}
