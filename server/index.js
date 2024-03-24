const express = require('express');
const morgan = require('morgan');
const router = require('./routes');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use('/api', router);

app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
})