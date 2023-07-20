import { log } from 'console';
import { EventEmitter } from 'events';

const INTERVAL = 500;

function ticker(times, callback) {
  let count = 0;
  const emitter = new EventEmitter();

  function schedule() {
    const isError = Date.now() % 5 === 0;
    emitter.emit('tick');
    if (isError) {
      emitter.emit('error');
    }
    setTimeout(() => {
      if (++count * INTERVAL >= times) {
        return callback(isError, count);
      }
      schedule();
    }, INTERVAL);
  }

  process.nextTick(() => schedule());

  return emitter;
}

ticker(1000, (err, totalTicks) => {
  if (err) {
    console.log('Error from callback');
  }
  console.log(`Total ticks: ${totalTicks}`);
})
  .on('tick', () => console.log('Tick!'))
  .on('error', () => console.log('Error from emitter'));
