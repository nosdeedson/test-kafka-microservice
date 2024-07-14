import { Injectable } from '@nestjs/common';

const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'test-1',
  brokers: ['localhost:9092'],
})

@Injectable()
export class ConsumerMessageService {

    static async testKafkaConsumer() {
        const consumer = kafka.consumer({ groupId: 'teste-1' })
    
        await consumer.connect()
        await consumer.subscribe({ topic: 'teste', fromBeginning: true })
    
        await consumer.run({
         eachMessage: async ({ topic, partition, message }) => {
            let value = message.value;
            let json = JSON.parse(value);
            console.log(json.body.teste)
          },
        })
      }

}
