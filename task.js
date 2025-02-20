import fs from 'fs';

async function task(userId) {
  console.log(`${userId}-task completed at-${Date.now()}`);
  fs.appendFile('task-log.txt', `${userId}-task completed at-${Date.now()}\n`, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

export default task;
