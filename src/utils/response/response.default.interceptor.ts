import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    mixin,
    Type,
    HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response } from 'express';
import { responseInfo } from 'src/constants/response';

// TODO: Not Understand Yet Completely
export function ResponseDefaultInterceptor(
    messagePath: string,
): Type<NestInterceptor> {
    @Injectable()
    class MixinResponseDefaultInterceptor
        implements NestInterceptor<Promise<any>>
    {
        async intercept(
            context: ExecutionContext,
            next: CallHandler,
        ): Promise<Observable<Promise<any> | string>> {
            if (context.getType() === 'http') {
                return next.handle().pipe(
                    map(async (responseData: Promise<Record<string, any>>) => {
                        const ctx: HttpArgumentsHost = context.switchToHttp();
                        const response: Response = ctx.getResponse();
                        const statusCode = response.statusCode;

                        // Getting response information using response name
                        const responseStatusMessage =
                            responseInfo?.[messagePath];

                        // Getting response messages
                        const responseMessage =
                            responseStatusMessage?.message ?? messagePath;

                        // Getting response status code
                        const responseStatusCode =
                            responseStatusMessage?.statusCode ?? statusCode;

                        response.statusCode = responseStatusCode;

                        let customMetadata;
                        let customData;

                        if (
                            typeof responseData == 'string' ||
                            Array.isArray(responseData)
                        ) {
                            customData = responseData;
                        } else if (typeof responseData == 'object') {
                            const { metadata, ...data } = await responseData;
                            customMetadata = metadata;
                            if (!data.data) customData = data;
                            else customData = data.data;
                        }

                        return {
                            statusCode: responseStatusCode,
                            message: responseMessage,
                            data: customData,
                            metadata: customMetadata,
                        };
                    }),
                );
            }

            return next.handle();
        }
    }

    return mixin(MixinResponseDefaultInterceptor);
}
