const path = require('path');
const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/', adminController.getDashboard);

router.get('/stock/create', adminController.getStockCreate);
router.post('/stock/create', adminController.postStockCreate);

router.get('/stock/:symbol/update', adminController.getStockUpdate);
router.post('/stock/:symbol/update', adminController.postStockUpdate);

router.get('/stock/:symbol/delete', adminController.getStockDelete);

router.get('/stocks', adminController.getStocks)

module.exports = router;