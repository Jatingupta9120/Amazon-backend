import { ConfigModule } from '@nestjs/config';
import Configs from 'src/config';

export default (() => {
    const envFilePath = `.env.${process.env.NODE_ENV}`;

    return ConfigModule.forRoot({
        load: Configs,
        isGlobal: true,
        cache: true,
        ignoreEnvFile: false,
        envFilePath: [envFilePath],
    });
})();
