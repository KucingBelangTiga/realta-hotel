/* eslint-disable prettier/prettier */
import { UploadMiddleware } from './upload.middleware';

describe('UploadMiddleware', () => {
  it('should be defined', () => {
    expect(new UploadMiddleware()).toBeDefined();
  });
});
