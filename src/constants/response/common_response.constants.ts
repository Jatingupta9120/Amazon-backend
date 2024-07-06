import { HttpStatus } from '@nestjs/common';
import { iResponseStatusMessage } from 'src/utils/response/response.interface';

export const responseName = {
    USER_CREATED: 'USER_CREATED',
};

export const responseInfo: Record<string, iResponseStatusMessage> = {
    USER_CREATED: {
        message: 'User created successfully',
        statusCode: HttpStatus.CREATED,
    },
};
