import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { Kafka } from 'kafkajs';


const kafka = new Kafka({
  clientId: 'test-1',
  brokers: ['localhost:9092'],
})

const consumer = kafka.consumer({ groupId: 'teste-1' })

@Module({})
export class ConsumerModuleModule implements OnModuleInit, OnModuleDestroy {
    
    async onModuleInit() {
       // th = kafka.consumer({ groupId: 'teste-1' })
    
        await consumer.connect()
        await consumer.subscribe({ topic: 'teste', fromBeginning: true })
    
        await consumer.run({
         eachMessage: async ({ topic, partition, message }) => {
            let value = message.value;
            let json = JSON.parse(value.toString());
            console.log(message.value.toString())
          },
        })
    }

    onModuleDestroy() {
        consumer.disconnect()
    }

    
}
