const express = require('express');
const morgan = require('morgan');
const router = require('./routes');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(morgan('dev'));
app.use(express.json());
app.use('/api', router);

app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
})