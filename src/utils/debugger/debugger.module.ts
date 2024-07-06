import { Global, Module } from '@nestjs/common';
import { DebuggerService } from './service/debugger.service';
import { LoggerService } from './service/logger.service';

@Global()
@Module({
    imports: [],
    providers: [DebuggerService, LoggerService],
    exports: [DebuggerService, LoggerService],
})
export class DebuggerModule {}
