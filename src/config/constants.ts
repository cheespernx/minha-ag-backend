require('dotenv').config(); // eslint-disable-line
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const isProduction = process.env.environment === 'production';

export const db_ag = process.env.database_ag;

export const database = {
  host: process.env.host,
  username: process.env.db_username,
  password: process.env.password,
};
