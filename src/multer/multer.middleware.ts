import { Injectable } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class ConfigMulter {
  static Uploadfiles(): MulterOptions {
    return {
      dest: './uploads',
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          // const randomName = Array(32)
          //   .fill(null)
          //   .map(() => Math.round(Math.random() * 16).toString(16))
          //   .join('');

          cb(null, `${file.originalname}`);
        },
      }),
      fileFilter(req, file, callback) {
        file.filename = file.filename + extname(file.originalname);
        if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          file.filename = file.filename + extname(file.originalname);
          callback(null, true);
        } else {
          return callback(
            new Error('Only .png .jpg and .jpeg format allowed'),
            false,
          );
        }
      },
      limits: { fieldSize: 1 * 1024 * 1024 },
    };
  }
}
