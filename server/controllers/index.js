const axios = require('axios');
const baseURL ='http://127.0.0.1:8080';

module.exports = {
  checkId: (req, res) => {
    axios.get(`${baseURL}/api/idExist/?id=${req.query.id}`)
    .then(({data}) => {
      res.send(data);
    });
  },
  checkCred: (req, res) => {
    const {id, pw} = req.query;
    axios.get(`${baseURL}/api/checkCred`, {
      params: {id,pw}
    })
    .then(({data}) => res.send(data));
  },
  createId: (req, res) => {
    const {id, pw, name} = req.body;
    axios.post(`${baseURL}/api/createId`, {id, pw, name})
    .then(({data}) => {
      res.send(data);
    });
  },
  getCred: (req, res) => {
    axios.get(`${baseURL}/api/getCred/?id=${req.query.id}`)
    .then(({data}) => res.send(data));
  }
}