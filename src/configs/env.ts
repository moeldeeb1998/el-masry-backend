import { config } from 'dotenv';
config();

import { plainToInstance } from 'class-transformer';
import * as Joi from 'joi';

export const env = {
  APP: {
    DOMAIN: process.env.APP_DOMAIN ?? 'http://localhost',
    PORT: Number(process.env.APP_PORT ?? 3000),
    ENV: process.env.APP_ENV ?? 'DEV',
  },
  DATABASE: {
    HOST: process.env.DATABASE_HOST,
    PORT: Number(process.env.DATABASE_PORT) ?? 5432,
    NAME: process.env.DATABASE_NAME,
    USERNAME: process.env.DATABASE_USERNAME,
    PASSWORD: process.env.DATABASE_PASSWORD,
  },
  ADMIN: {
    FIRSTNAME: process.env.ADMIN_FIRSTNAME,
    LASTNAME: process.env.ADMIN_LASTNAME,
    EMAIL: process.env.ADMIN_EMAIL,
    PASSWORD: process.env.ADMIN_PASSWORD,
  },
  SECRETS: {
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_ACCESS_EXPIRY: Number(process.env.JWT_ACCESS_EXPIRY) ?? 5, // 5 min
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRY: Number(process.env.JWT_REFRESH_EXPIRY) ?? 7, // 7 days
  },
};

export const configSchema = Joi.object({
  APP: Joi.object({
    DOMAIN: Joi.string().required(),
    PORT: Joi.number().port().required(),
    ENV: Joi.string().valid('DEV', 'PROD', 'TEST').required(),
  }),
  DATABASE: Joi.object({
    HOST: Joi.string().required(),
    PORT: Joi.number().port().required(),
    NAME: Joi.string().required(),
    USERNAME: Joi.string().required(),
    PASSWORD: Joi.string().required(),
  }),
  ADMIN: Joi.object({
    FIRSTNAME: Joi.string().required(),
    LASTNAME: Joi.string().required(),
    EMAIL: Joi.string().required(),
    PASSWORD: Joi.string().required(),
  }),
  SECRETS: Joi.object({
    JWT_ACCESS_SECRET: Joi.string().required(),
    JWT_ACCESS_EXPIRY: Joi.number().required(),
    JWT_REFRESH_SECRET: Joi.string().required(),
    JWT_REFRESH_EXPIRY: Joi.number().required(),
  }),
});

class EnvironmentVariables {}

export const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const { error } = configSchema.validate(env);
  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return validatedConfig;
};
