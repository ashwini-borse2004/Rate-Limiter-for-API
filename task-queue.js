import BullQueue from 'bull';
import task from './task.js';

const taskQueue = new BullQueue('task-queue', {
  redis: {
    host: 'localhost',
    port: 6379,
  },
});

export default taskQueue;
