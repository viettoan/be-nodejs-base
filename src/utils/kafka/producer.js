import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    brokers: [
        'localhost:9092',
    ],
});

const producer = kafka.producer();

export const run = async ({ topic, message }) => {
    await producer.connect();
    await producer.send({
        topic,
        messages: [
            {
                value: JSON.stringify(message)
            }
        ]
    });
    console.log('Message sent successfully', message);
}