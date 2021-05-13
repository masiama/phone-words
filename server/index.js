const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;
const LIMIT = 500;
const DICTIONARY = {
  2: ['a', 'b', 'c'],
  3: ['d', 'e', 'f'],
  4: ['g', 'h', 'i'],
  5: ['j', 'k', 'l'],
  6: ['m', 'n', 'o'],
  7: ['p', 'q', 'r', 's'],
  8: ['t', 'u', 'v'],
  9: ['w', 'x', 'y', 'z'],
  0: [' '],
};

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(express.json());
app.post('/convert', (req, res) => {
  const value = req.body && req.body.value;
  if (!value) return res.json({ truncated: false, list: [] });

  const string = value.toString();
  const array = string.split('').map(char => DICTIONARY[char] || [char]);

  const generator = cartesian(...array);
  const list = [];
  for (let i = 0; i < LIMIT; i++) {
    const step = generator.next();
    list.push(step.value);
    if (step.done) break;
  }
  const truncated = !generator.next().done;

  res.json({ truncated, list });
});

app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

// function* cartesian(head, ...tail) {
//   const remainder = tail.length > 0 ? cartesian(...tail) : [[]];
//   for (let h of head) for (let r of remainder) yield [h, ...r];
// }

function cartesian(...arrays) {
  let current = new Array(arrays.length);
  return (function* backtracking(index) {
    if (index == arrays.length) yield current.slice();
    else {
      for (let num of arrays[index]) {
        current[index] = num;
        yield* backtracking(index + 1);
      }
    }
  })(0);
}
