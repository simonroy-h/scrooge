const stockService = require('../service/stock');

exports.getDashboard = (req, res, next) => {
    res.render('admin/dashboard', {
        path: '/'
    });
};

exports.getStockCreate = (req, res, next) => {
    res.status(200).render('admin/stock_create_update', {
        path: '/create'
    });
};

exports.postStockCreate = (req, res, next) => {
    var body = req.body;
    body.updatedAt = Date.now();
    if (!body.symbol) {
        res.status(400).send('Stock symbol is missing');
        return;
    }
    stockService.createStock(body, (err, stock) => {
        if (stock) {
            res.status(201).redirect('/admin/stocks');
        } else if (err) {
            res.status(400).send(err);
        }
    });
};

exports.getStockUpdate = (req, res, next) => {
    var params = req.params || {};
    var query = {
        symbol: params.symbol
    };
    if (!query) {
        res.status(400).send('Bad request');
        return;
    }
    stockService.findStock(query, (err, stock) => {
        if (err) {
            res.status(404).send(err);
            return;
        }
        if (stock) {
            res.status(200).render('admin/stock_create_update', {
                path: '/update',
                stock: stock
            });
            return;
        }
        if (!stock) {
            res.status(204).send('No data found');
        }
    });
};

exports.postStockUpdate = (req, res, next) => {
    var body = req.body;
    if (!body.symbol) {
        res.status(400).send('Symbol is missing');
        return;
    }
    stockService.updateStock(body.symbol, body, (err, response) => {
        if (response) {
            res.status(200).redirect('/admin/stocks');
        } else if (err) {
            res.status(400).send(err);
        }
    });
};

exports.getStockDelete = (req, res, next) => {
    var params = req.params || {};
    var query = {
        symbol: params.symbol
    };
    if (!query) {
        res.status(400).send('Bad request');
        return;
    }
    stockService.deleteStock(query, (err, response) => {
        if (err) {
            res.status(400).send(error);
            return;
        }
        if (response) {
            if (response.n === 1 && response.ok === 1) {
                res.status(202).redirect('/admin/stocks');
            }
            if (response.n === 0 && response.ok === 1) {
                res.status(204).send({
                    message: 'No data found'
                });
            }
        }
    });
};

exports.getStock = (req, res, next) => {
    var params = req.params || {};
    var query = {
        symbol: params.symbol
    };
    if (!query) {
        res.status(400).send('Bad request');
        return;
    }
    stockService.findStock(query, (err, response) => {
        if (err) {
            res.status(404).send(err);
            return;
        }
        if (response) {
            res.status(200).json(response);
            return;
        }
        if (!response) {
            res.status(204).send('No data found');
        }
    });
};

exports.getStocks = (req, res, next) => {
    stockService.findStocks((err, stocks) => {
        if (err) {
            res.status(404).send(err);
            return;
        }
        if (stocks) {
            res.status(200).render('admin/stocks', {
                stocks: stocks
            });
            return;
        }
        if (!stocks) {
            res.status(204).send('No data found');
        }
    });
};