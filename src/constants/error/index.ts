import { defaultErrorConfig } from './config/default';
import { commonErrorConfig } from './config/common';

import { DEFAULT_ERROR } from './errors/default';
import { COMMON_ERROR } from './errors/common';
import { masterErrorConfig } from './config/master';
import { MASTER_ERROR } from './errors/master';

export type ERROR = DEFAULT_ERROR | COMMON_ERROR |MASTER_ERROR;

export { DEFAULT_ERROR, COMMON_ERROR ,MASTER_ERROR};

export const errorConfig = {
    ...defaultErrorConfig,
    ...commonErrorConfig,
    ...masterErrorConfig,
};
