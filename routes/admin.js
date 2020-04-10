const path = require('path');
const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/admin/', adminController.getDashboard);

router.get('/admin/stock/create', adminController.getStockCreate);
router.post('/admin/stock/create', adminController.postStockCreate);

router.get('/admin/stock/:id/update', adminController.getStockUpdate);
router.post('/admin/stock/:id/update', adminController.postStockUpdate);

router.get('/admin/stock/:id/delete', adminController.getStockDelete);
router.post('/admin/stock/:id/delete', adminController.postStockDelete);

router.get('/admin/stock/:id', adminController.getStock);

router.get('/admin/stocks', adminController.getStocks)

module.exports = router;