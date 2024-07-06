import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class LoggerService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}

    info(message: string, param?: Record<string, any>) {
        const [className, functionName] = this.getCallerFunctionName();
        this.logger.info(
            `${className} :: ${functionName} :: ${message} ::`,
            param,
        );
    }

    debug(message: string, param?: Record<string, any>) {
        const [className, functionName] = this.getCallerFunctionName();
        this.logger.debug(
            `${className} :: ${functionName} :: ${message} ::`,
            param,
        );
    }

    error(message: string, param?: Record<string, any>) {
        const [className, functionName] = this.getCallerFunctionName();
        this.logger.error(
            `${className} :: ${functionName} :: ${message} ::`,
            param,
        );
    }

    log(message: string, param?: Record<string, any>) {
        const [className, functionName] = this.getCallerFunctionName();
        this.logger.log(
            `${className} :: ${functionName} :: ${message} ::`,
            param,
        );
    }

    getCallerFunctionName() {
        const error = new Error();
        const stack = error?.stack?.split('\n') || [];

        // Assuming the caller function is at the third position in the stack trace
        const callerLine = stack[3] || '';
        const classWithFunction = callerLine?.trim()?.split(' ')?.[1];
        const [className, functionName] = classWithFunction?.split('.') ?? [];
        return [
            className ?? 'AnonymousClass',
            functionName ?? 'AnonymousFunction',
        ];
    }
}
