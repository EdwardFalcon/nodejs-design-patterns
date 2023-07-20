import { log } from 'console';
import { EventEmitter } from 'events';

const INTERVAL = 500;

function ticker(times, callback) {
  let count = 0;
  const emitter = new EventEmitter();

  function schedule() {
    emitter.emit('tick');
    setTimeout(() => {
      if (++count * INTERVAL >= times) {
        return callback(count);
      }
      schedule();
    }, INTERVAL);
  }

  process.nextTick(() => schedule());

  return emitter;
}

ticker(1000, (totalTicks) => console.log(`Total ticks: ${totalTicks}`)).on(
  'tick',
  () => console.log('Tick!')
);
