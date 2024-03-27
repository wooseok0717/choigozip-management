const router = require('express').Router();
const controllers = require('./controllers');

router.get('/idExist', controllers.checkId);

router.get('/checkCred', controllers.checkCred);

module.exports = router;