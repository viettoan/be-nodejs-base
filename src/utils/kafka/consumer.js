import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    brokers: [
        'localhost:9092',
    ],
});

const consumer = kafka.consumer({
    groupId: 'kafka'
});

export const run = async () => {
    await consumer.connect();
    await consumer.subscribe({
        topic: 'test-topic',
        fromBeginning: true
    });
    await consumer.run({
        eachMessage: async ({ message, topic}) => {
            console.log('Consumer message ', topic, message.value, message.value.toString());
        }
    })
}