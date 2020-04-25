const path = require('path');
const express = require('express');
const clientController = require('../controllers/client');

const router = express.Router();

router.get('/', clientController.getSearch);
router.post('/', clientController.postSearch);

router.get('/stock/:symbol', clientController.getStock);

router.post('/contact', clientController.postContact);

module.exports = router;