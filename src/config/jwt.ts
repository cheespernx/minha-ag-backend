require('dotenv').config(); // eslint-disable-line

export const jwtConstants = {
  secret: process.env.jwt_secret,
};
