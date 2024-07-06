import { HttpStatus } from '@nestjs/common';
import { iResponseStatusMessage } from 'src/utils/response/response.interface';

export const masterResponseName = {
    USER_CREATED: 'USER_CREATED',
    PRODUCT_CREATED: 'PRODUCT_CREATED',
    ORDER_CREATED: 'ORDER_CREATED',
    GET_ALL_USERS:'GET_ALL_USERS',
    GET_USER:'GET_USER',
    GET_ALL_PRODUCTS:'GET_ALL_PRODUCTS',
    GET_ALL_ORDERS:'GET_ALL_ORDERS',

};

export const MasterResponseInfo: Record<string, iResponseStatusMessage> = {
    USER_CREATED: {
        message: 'User created successfully',
        statusCode: HttpStatus.CREATED,
    },
    PRODUCT_CREATED: {
        message: 'product created successfully',
        statusCode: HttpStatus.CREATED,
    },
    ORDER_CREATED: {
        message: 'order created successfully',
        statusCode: HttpStatus.CREATED,
    },

    GET_USER: {
        message: 'fetch user successfully',
        statusCode: HttpStatus.OK,
    },

    GET_ALL_USERS: {
        message: 'fetch all user successfully',
        statusCode: HttpStatus.OK,
    },
    GET_ALL_PRODUCTS: {
        message: 'fetch all product successfully',
        statusCode: HttpStatus.OK,
    },
    GET_ALL_ORDERS: {
        message: 'fetch all order successfully',
        statusCode: HttpStatus.OK,
    },
};
