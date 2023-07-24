import { readFile, writeFile } from 'fs';

function concatFiles(...args) {
  if (args.length < 3) {
    throw new Error('Not enough arguments');
  }

  const fileNames = args.splice(0, args.length - 2);
  const [destination, callback] = args;

  const results = [];
  let completed = 0;

  function read(fileName, index) {
    readFile(fileName, (err, data) => {
      if (err) {
        return callback(err);
      }
      results[index] = data;
      if (++completed === fileNames.length) {
        writeFile(destination, results.join(''), (err) => callback(err));
      }
    });
  }

  fileNames.forEach((fileName, index) => read(fileName, index));
}

console.log('after');
concatFiles('foo.txt', 'bar.txt', 'foobar.txt', (err) => {
  if (err) {
    throw err;
  }
  console.log('Done');
});
console.log('before');
