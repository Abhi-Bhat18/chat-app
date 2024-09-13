import Redis from "ioredis";

export const connectToRedis = ( host : string, port : number, password : string) => { 
    return new Redis({
        host:host,
        port: port,
        password:password
    });
}

export const setKey = (client: Redis, key: string, value: string) => {
    return client.set(key, value);
}

export const getKey = (client: Redis, key: string) => {
    return client.get(key);
}
