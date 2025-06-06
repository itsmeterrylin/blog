import { Redis } from "@upstash/redis";

// Mock Redis client for development
class MockRedis {
  private store = new Map();
  
  async hincrby(key: string, field: string, increment: number) {
    const hashKey = `${key}:${field}`;
    const current = this.store.get(hashKey) || 0;
    const newValue = current + increment;
    this.store.set(hashKey, newValue);
    return newValue;
  }
  
  async hget(key: string, field: string) {
    const hashKey = `${key}:${field}`;
    return this.store.get(hashKey) || 0;
  }
}

let redis;

if (!process.env.UPSTASH_REDIS_REST_TOKEN) {
  console.warn("⚠️ UPSTASH_REDIS_REST_TOKEN not found, using mock Redis for development");
  redis = new MockRedis();
} else {
  redis = new Redis({
    url: "https://huge-grouse-46387.upstash.io",
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

export default redis;
