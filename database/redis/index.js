import { createClient, createCluster } from "redis";

const host = process.env.REDIS_HOST || '127.0.0.1';
const username = process.env.REDIS_USERNAME || '';
const password = process.env.REDIS_PASSWORD || '';
const port = process.env.REDIS_PORT || '6379';
const enableCluster = process.env.REDIS_ENABLE_CLUSTER || 0;
const connectStr = `redis://${username}:${password}@${host}:${port}`;
const configCluster = {
    rootNodes: [
        {
            url: connectStr
        },
    ],
    useReplicas: true,
};

const configClient = {
    url: connectStr
};

const redis = +enableCluster === 1 ? createCluster(configCluster) : createClient(configClient);
redis.on(
    'error',
    (err) => console.log('Redis Error', err)
);
redis.connect().then(
    () => {
        console.log(`redis connected, enableCluster ${enableCluster}`);
    }
);

export default redis;
