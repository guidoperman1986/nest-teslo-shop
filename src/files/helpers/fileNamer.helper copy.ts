/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
import {v4 as uuid} from 'uuid';

export const fileNamer = (
  req: Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  // if (!file) return callback(new Error('File is empty'), false);

  // const fileExtention = file.mimetype.split('/')[1];
  // const fileName = `${uuid()}.${fileExtention}`;
// 
  // return callback(null, fileName);

  const fileExtention = file.mimetype.split('/')[1];
  const fileName = `${Date.now()}.${fileExtention}`;
  callback(null, fileName);
};
