const stockService = require('../service/stock');

exports.getSearch = (req, res, next) => {
    res.render('client/search');
};

exports.postSearch = (req, res, next) => {
    res.redirect('/stock/' + req.body.symbol);
};

exports.getStock = (req, res, next) => {
    var params = req.params || {};
    var query = {
        symbol: params.symbol
    };
    if (!query) {
        res.locals.message = req.flash('info', 'Bad request!');
        res.status(400).redirect('/400');
        return;
    }
    stockService.findStock(query, (err, stock) => {
        if (err) {
            res.status(404).redirect('/404');
            return;
        }
        if (stock) {
            res.status(200).render('client/stock', {
                stock: stock
            });
            return;
        }
        if (!stock) {
            res.locals.message = req.flash('info', 'No stock found for that symbol!');
            res.status(204).redirect('/');
        }
    });
};
