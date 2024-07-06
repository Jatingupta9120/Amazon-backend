import { Module } from '@nestjs/common';
import { OtherServiceGatewayService } from './service/other_service.service';

@Module({
    imports: [],
    providers: [OtherServiceGatewayService],
    exports: [OtherServiceGatewayService],
})
export class ServiceGatewayModule {}
