const axios = require('axios');
const baseURL ='http://127.0.0.1:8080';

module.exports = {
  checkId: (req, res) => {
    console.log(req.query.id);
    res.send('hello from controller');
  }
}