import { registerAs } from '@nestjs/config';

export default registerAs(
    'redis',
    (): Record<string, string | number | boolean | object> => ({
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 6379,
        password: process.env.PASSWORD || '',
        username: process.env.USERNAME || '',
    }),
);
