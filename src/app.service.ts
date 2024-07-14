import { Injectable } from '@nestjs/common';
import { KafkaPayload, KafkaService } from 'nestjs-kafka';

const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'test-1',
  brokers: ['localhost:9092'],
})

@Injectable()
export class AppService {

  constructor(
  //  private readonly kafkaService: KafkaService
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async testkafka(): Promise<any> {
    let message = 'edson jose ID:' + new Date().toLocaleDateString();
    const payload: KafkaPayload = {
      messageId: '' + new Date().valueOf(),
      body: { teste: message },
      messageType: "string",
      topicName: 'teste'
    }
    //return await this.kafkaService.sendMessage('teste', payload);

  }

  async testkafka2(): Promise<any> {
    let message = 'edson jose ID:' + new Date().valueOf();
    const payload = {
      key: '' + new Date().getTime(),
      messageId: '' + new Date().valueOf(),
      body: { teste: message },
      messageType: "string",
      topicName: 'teste'
    }
    const producer = kafka.producer()
    await producer.connect()
    return await producer.send({
      topic: 'teste',
      messages: [
        { value: JSON.stringify(payload) },
      ],
    })

  }

  async testKafkaConsumer(): Promise<any> {
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
