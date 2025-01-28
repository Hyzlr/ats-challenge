import { Module } from '@nestjs/common';
import { ResumeService } from './services/resume.service';
import { ResumeController } from './controllers/resume.controller';

@Module({
  providers: [ResumeService],
  controllers: [ResumeController]
})
export class ResumeModule {}
