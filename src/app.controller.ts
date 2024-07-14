import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test-kafka')
  async testKafka(): Promise<any>{
    return await this.appService.testkafka();
  }

  @Get('test-kafka-2')
  async testKafka2(): Promise<any>{
    return await this.appService.testkafka2();
  }

  @Get('test-kafka-consumer')
  async testKafkaConsumer(): Promise<any>{
    return await this.appService.testKafkaConsumer();
  }
}
