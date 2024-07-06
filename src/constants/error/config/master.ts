import { HttpStatus } from '@nestjs/common';
import { ErrorConfig } from '../error.types';
import { MASTER_ERROR } from '../errors/master';

export const masterErrorConfig: ErrorConfig<MASTER_ERROR> = {
    [MASTER_ERROR.ORDER_NOT_EXIST]: {
        message: 'order not exist',
        statusCode: HttpStatus.BAD_REQUEST,
        errorCode: 'ORDER_NOT_EXIST_ERROR',
    },
    [MASTER_ERROR.PRODUCT_NOT_EXIST]: {
        message: 'product not exists',
        statusCode: HttpStatus.BAD_REQUEST,
        errorCode: 'PRODUCT_NOT_EXIST_ERROR',
    },
    [MASTER_ERROR.USERS_NOT_EXISTS]: {
        message: 'users not exists',
        statusCode: HttpStatus.BAD_REQUEST,
        errorCode: 'USERS_NOT_EXISTS_ERROR',
    },
};
