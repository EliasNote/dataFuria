import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadInterceptor } from './file-upload-interceptor';

@Controller('file')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('upload')
  @UseInterceptors(FileUploadInterceptor)
  verifyFile(
    @Query('cpf') cpf: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.fileUploadService.verifyFile(cpf, file);
  }
}
