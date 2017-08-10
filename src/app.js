const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const STATUS_USER_ERROR = 422;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

/* Returns a list of dictionary words from the words.txt file. */
const readWords = () => {
  const contents = fs.readFileSync('words.txt', 'utf8');
  return contents.split('\n');
};
const words = readWords();
const index = Math.floor(Math.random() * words.length);
const guess = {};
const word = words[index];
// TODO: your code to handle requests

server.post('/guess', (req, res) => {
  const letter = req.body.letter;
  if (!letter) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must give letter' });
    return;
  }
  if (letter.length !== 1) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must give single letter' });
    return;
  }
  if (guess[letter]) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must give different letter' });
    return;
  }
  guess[letter] = true;
  res.json({ guess });
});

server.get('/', (req, res) => {
  const hangman = word.split('').map((letter) => {
    if (guess[letter]) {
      return letter;
    }
    return '-';
  })
  .join('');
  res.json({ hangman, guess });
});


server.listen(3000);
