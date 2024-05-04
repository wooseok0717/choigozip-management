const axios = require('axios');
require('dotenv').config();
const baseURL = process.env.baseURL;


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
  },
  createTimeStamp: (req, res) => {
    const {id, action, time} = req.body;
    axios.post(`${baseURL}/api/createTimeStamp`, {
      id, action, time
    })
    .then(({data}) => {
      res.send(data);
    });
  },
  getActivities: (req, res) => {
    axios.get(`${baseURL}/api/getActivities/?id=${req.query.id}`)
    .then(({data}) => res.send(data));
  },
  createCategory: (req, res) => {
    axios.post(`${baseURL}/api/createCategory`, req.body)
    .then(({data}) => res.send(data));
  },
  getCategories: (req, res) => {
    axios.get(`${baseURL}/api/getCategories`)
    .then(({data}) => res.send(data));
  },
  changeCategoryOrder: (req, res) => {
    axios.put(`${baseURL}/api/changeOrder/category`, null, {
      params: req.query
    })
    .then(({data}) => res.send(data));
  },
  createMenu: (req, res) => {
    axios.post(`${baseURL}/api/menu`, req.body)
    .then(({data}) => res.send(data));
  },
  getMenusWithId: (req, res) => {
    axios.get(`${baseURL}/api/menuList/?id=${req.query.id}`)
    .then(({data}) => res.send(data));
  },
  deleteCategory: (req, res) => {
    axios.delete(`${baseURL}/api/category/?id=${req.query.id}`)
    .then(({data}) => {res.send(data)})
  },
  changeCategoryData: (req, res) => {
    axios.put(`${baseURL}/api/category`, null, {
      params: req.query
    })
    .then(({data}) => res.send(data));
  },
  deleteMenu: (req, res) => {
    axios.delete(`${baseURL}/api/menu/?id=${req.query.id}`)
    .then(({data}) => res.send(data));
  },
  changeMenuOrder: (req, res) => {
    axios.put(`${baseURL}/api/changeOrder/menu`, null, {
      params: req.query
    })
    .then(({data}) => res.send(data));
  },
  changeMenuData: (req, res) => {
    axios.put(`${baseURL}/api/menu`, null, {
      params: req.query
    })
    .then(({data}) => res.send(data));
  },
  getUsers: (req, res) => {
    axios.get(`${baseURL}/api/users`)
    .then(({data}) => res.send(data));
  },
  updateTier: (req, res) => {
    const {id, tier} = req.query;
    axios.put(`${baseURL}/api/updateTier/?id=${id}&tier=${tier}`)
    .then(({data}) => res.send(data));
  },
  createPromo: (req, res) => {
    axios.post(`${baseURL}/api/promo`, req.body)
    .then(({data}) => res.send(data));
  },
  getPromos: (req, res) => {
    axios.get(`${baseURL}/api/promos`)
    .then(({data}) => res.send(data));
  },
  deletePromo: (req, res) => {
    axios.delete(`${baseURL}/api/promo/?id=${req.query.id}`)
    .then(({data}) => res.send(data));
  },
  updatePromo: (req, res) => {
    axios.put(`${baseURL}/api/promo`, null, {
      params: req.query
    })
    .then(({data}) => res.send(data));
  },
  updatePromoState: (req, res) => {
    const {id, active} = req.query;
    axios.put(`${baseURL}/api/activatePromo/?id=${id}&active=${active}`)
    .then(({data}) => res.send(data));
  },
  createSalesReport: (req, res) => {
    axios.post(`${baseURL}/api/salesReport`, req.body)
    .then(({data}) => res.send(data));
  },
  loadSalesReport: (req, res) => {
    axios.get(`${baseURL}/api/salesReport`)
    .then(({data}) => res.send(data));
  }
}