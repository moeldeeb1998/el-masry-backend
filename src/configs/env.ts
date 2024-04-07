import { config } from 'dotenv';
config();

import { plainToInstance } from 'class-transformer';
import * as Joi from 'joi';

export const env = {
  APP: {
    HOST: process.env.APP_HOST ?? 'http://localhost',
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
};

export const configSchema = Joi.object({
  APP: Joi.object({
    HOST: Joi.string().required(),
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