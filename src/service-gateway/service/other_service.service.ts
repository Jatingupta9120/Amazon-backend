import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { iOtherServiceHelper } from '../interface/other_service.interface';

@Injectable()
export class OtherServiceGatewayService {
    private otherServiceUrl: string;
    private axiosClient: AxiosInstance;

    // axios setup and api call
    constructor(
        private configService: ConfigService,
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger,
    ) {
        this.otherServiceUrl = this.configService.get(
            'microService.otherServiceUrl',
        )!;
        this.axiosClient = axios.create({
            baseURL: `${this.otherServiceUrl}`,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
    }

    /**
     * Function used for getting data from other service
     * @param {iOtherServiceHelper} helper
     * @returns
     */
    public async getHelperData(helper: iOtherServiceHelper) {
        this.logger.info(
            'OtherServiceGatewayService :: API call for getting data ::',
            { helper },
        );
        try {
            const result = await await this.axiosClient.post(
                '/route/for/helper/data',
                JSON.stringify({ helper }),
            );
            return result.data;
        } catch (error: any) {
            this.logger.error(
                `OtherServiceGatewayService :: ${this.getHelperData.name} :: `,
                error?.response?.data ?? error?.message,
            );

            // TODO:: Need to updated this logic
            const errorMessage = error?.response?.data?.error ?? error.message;
            throw new Error(errorMessage);
        }
    }
}
