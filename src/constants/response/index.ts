import { iResponseStatusMessage } from 'src/utils/response/response.interface';
import * as CommonResponse from './common_response.constants';
import { MasterResponseInfo, masterResponseName } from './responseCode/user';

// Response action name
export const responseName = {
    ...CommonResponse.responseName,
    masterResponseName,
};

// Response information
export const responseInfo: Record<string, iResponseStatusMessage> = {
    ...CommonResponse.responseInfo,
    ...MasterResponseInfo,
};
