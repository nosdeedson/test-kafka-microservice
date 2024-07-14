import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {KafkaModule} from 'nestjs-kafka'
import { KafkaConfig } from 'nestjs-kafka/dist/KafkaMessage';
import { ConsumerMessageService } from './consumer/consumer-message/consumer-message.service';
import { ConsumerModuleModule } from './consumer/consumer-module/consumer-module.module';

// const serviceConfig: KafkaConfig = {
//     clientId: 'test',
//     brokers: ['localhost:9092'],
//     groupId: "test-1",

// } 

@Module({
  imports: [
    //KafkaModule.register(serviceConfig), uses nestjskafka
    ConsumerModuleModule],
  controllers: [AppController],
  providers: [AppService, ConsumerMessageService],
})
export class AppModule {}
