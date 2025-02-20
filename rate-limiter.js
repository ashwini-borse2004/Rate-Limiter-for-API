import Redis from 'ioredis';

const redis = new Redis();

class RateLimiter {
  async checkRateLimit(userId, interval, maxRequests) {
    const key = `rate-limit:${userId}:${interval}`;
    const count = await redis.incr(key);
    await redis.expire(key, interval);
    return count <= maxRequests;
  }
}

export default RateLimiter;
