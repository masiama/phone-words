const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/convert', (_, res) => {
  res.json({ message: 'Hello from server!' });
});

app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
