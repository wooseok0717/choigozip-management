const router = require('express').Router();
const controllers = require('./controllers');

router.get('/idExist', controllers.checkId);

module.exports = router;