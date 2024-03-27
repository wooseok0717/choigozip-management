const axios = require('axios');
const baseURL ='http://127.0.0.1:8080';

module.exports = {
  checkId: (req, res) => {
    // console.log(req.query.id);
    axios.get(`${baseURL}/api/idExist/?id=${req.query.id}`)
    .then(({data}) => {
      res.send(data);
    })
    // res.send('hello')
  },
  checkCred: (req, res) => {
    axios.get(`${baseURL}/api/checkCred`, {
      params: {
        id: req.query.id,
        pw: req.query.pw
      }
    })
    .then(({data}) => res.send(data));
  }
}