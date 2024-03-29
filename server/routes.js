const router = require('express').Router();
const controllers = require('./controllers');

router.get('/idExist', controllers.checkId);

router.get('/checkCred', controllers.checkCred);

router.post('/signup', controllers.createId);

router.get('/getCred', controllers.getCred);

module.exports = router;