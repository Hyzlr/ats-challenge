import { Injectable } from '@nestjs/common';

// services
import { ConfigService } from 'src/common/config/config.service';

@Injectable()
export class ResumeService {
    constructor(private readonly configService: ConfigService) {}

    public readTextFromPdf(filePath: string) {
        try {

        } catch (err) {

        }
    }

    public generateAnonymousResume(resumeText: string) {
        
    }

}
