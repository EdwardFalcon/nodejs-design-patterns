import { EventEmitter } from 'events';

const INTERVAL = 50;

function ticker(times, callback) {
  let count = 0;
  const emitter = new EventEmitter();

  function schedule() {
    setTimeout(() => {
      if (++count * INTERVAL > times) {
        return callback(count - 1);
      }
      emitter.emit('tick');
      schedule();
    }, INTERVAL);
  }

  schedule();
  return emitter;
}

ticker(100, (totalTicks) => console.log(`Total ticks: ${totalTicks}`)).on(
  'tick',
  () => console.log('Tick!')
);
