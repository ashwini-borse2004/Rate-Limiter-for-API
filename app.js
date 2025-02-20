import express from 'express';
import RateLimiter from './rate-limiter.js';
import taskQueue from './task-queue.js';
import task from './task.js';

const app = express();
const rateLimiter=new RateLimiter();
app.use(express.json());

app.post('/api/v1/task', async (req, res) => {
  const userId = req.body.user_id;
  const rateLimitInterval = 1000; // 1 second
  const rateLimitMaxRequests = 1;
  const minuteRateLimitInterval = 60 * 1000; // 1 minute
  const minuteRateLimitMaxRequests = 20;

  if (!(await rateLimiter.checkRateLimit(userId, rateLimitInterval, rateLimitMaxRequests)) ||
      !(await rateLimiter.checkRateLimit(userId, minuteRateLimitInterval, minuteRateLimitMaxRequests))) {
    taskQueue.add(userId, task);
    res.status(202).send(`Task queued for user ${userId}`);
    console.log(`Task queued for user ${userId}`)
  } else {
    await task(userId);
    res.send(`Task completed for user ${userId}`);
    console.log(`Task completed for user ${userId}`)
  }
});

export default app;
