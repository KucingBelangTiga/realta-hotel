/* eslint-disable prettier/prettier */
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import path = require ('path');

@Injectable()
export class UploadMiddleware implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = extname(file.originalname);
          const fileName = `${file.originalname}-${uniqueSuffix}${extension}`;
          callback(null, fileName);
        }
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: { fileSize: 1 * 1024 * 1024 },
    };
  }
}
