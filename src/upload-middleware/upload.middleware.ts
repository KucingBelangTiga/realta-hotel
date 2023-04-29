/* eslint-disable prettier/prettier */
// import { Injectable } from '@nestjs/common';
// import { MulterOptionsFactory } from '@nestjs/platform-express';
// import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
// import { extname } from 'path';

// @Injectable()
// export class UploadMiddleware {
//   static MulterOption(): MulterOptions {
//     return {
//       dest: './uploads',
//       fileFilter(req, file, callback) {
//         file.filename = file.filename + extname(file.originalname);
//         if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
//           file.filename = file.filename + extname(file.originalname);
//           callback(null, true);
//         } else {
//           return callback(
//             new Error('Only .png, .jpg, and .jpeg format allowed'),
//             false,
//           );
//         }
//       },
//       limits: { fileSize: 1 * 1024 * 1024 },
//     };
//   }
// }

//edit agar foto tersimpan beserta ekstensinya, dgn tambahan di controller
//mungkin yg dipakai cuma yg di controller, atau mungkin middleware ini bisa dipanggil di controller
//source: https://www.youtube.com/watch?v=A1RbTJn0mYE
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
