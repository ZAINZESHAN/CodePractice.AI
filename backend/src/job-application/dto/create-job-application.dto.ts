import { IsInt } from 'class-validator';

export class CreateJobApplicationDto {
  @IsInt()
  jobId: number;
}
