const router = require('express').Router();
const controllers = require('./controllers');

router.get('/idExist', controllers.checkId);

router.get('/checkCred', controllers.checkCred);

router.post('/signup', controllers.createId);

router.get('/getCred', controllers.getCred);

router.get('/getRecentActivity', controllers.getActivities);

router.post('/createTimeStamp', controllers.createTimeStamp);

router.post('/category', controllers.createCategory);

router.get('/categories', controllers.getCategories);

router.put('/changeOrder/category', controllers.changeCategoryOrder);

router.post('/menu', controllers.createMenu);

router.get('/menuList', controllers.getMenusWithId);

router.delete('/category', controllers.deleteCategory);

router.put('/category', controllers.changeCategoryData);

router.delete('/menu', controllers.deleteMenu);

router.put('/changeOrder/menu', controllers.changeMenuOrder);

router.put('/menu', controllers.changeMenuData);

router.get('/users', controllers.getUsers);

router.put('/updateTier', controllers.updateTier);

router.post('/promo', controllers.createPromo);

router.get('/promos', controllers.getPromos);

router.delete('/promo',controllers.deletePromo);

router.put('/promo', controllers.updatePromo);

router.put('/activatePromo', controllers.updatePromoState);

router.post('/salesReport', controllers.createSalesReport);

router.get('/salesReport', controllers.loadSalesReport);

router.get('/salesReport/maxPage', controllers.getMaxPage);

router.get('/stats', controllers.getStats);

router.post('/record', controllers.createRecord);

router.get('/history', controllers.loadHistory);

router.delete('/deleteTimestamp', controllers.deleteTimestamp);

router.get('/salesDate', controllers.getSalesWithDate);

module.exports = router;