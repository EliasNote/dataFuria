import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { extname } from 'path';
import { BadRequestException } from '@nestjs/common';

const FILE_TYPE = /jpeg|jpg|png|gif|pdf/;

export const FileUploadInterceptor = FileInterceptor('file', {
  storage: memoryStorage(),
  fileFilter: (_req, file, callback) => {
    if (!FILE_TYPE.test(extname(file.originalname).toLowerCase())) {
      return callback(
        new BadRequestException('Apenas imagens ou PDFs são permitidos!'),
        false,
      );
    }
    callback(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});
