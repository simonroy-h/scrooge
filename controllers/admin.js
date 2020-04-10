exports.getDashboard = (req, res, next) => {
    res.render('admin/dashboard', {
        path: '/'
    });
};

exports.getStockCreate = (req, res, next) => {
    res.send('NOT IMPLEMENTED: Stock create GET');
};

exports.postStockCreate = (req, res, next) => {
    res.send('NOT IMPLEMENTED: Stock create POST');
};

exports.getStockUpdate = (req, res, next) => {
    res.send('NOT IMPLEMENTED: Stock update GET: ' + req.params.id);
};

exports.postStockUpdate = (req, res, next) => {
    res.send('NOT IMPLEMENTED: Stock update POST: ' + req.params.id);
};

exports.getStockDelete = (req, res, next) => {
    res.send('NOT IMPLEMENTED: Stock delete GET: ' + req.params.id);
};

exports.postStockDelete = (req, res, next) => {
    res.send('NOT IMPLEMENTED: Stock delete POST: ' + req.params.id);
};

exports.getStock = (req, res, next) => {
    res.send('NOT IMPLEMENTED: Stock view GET: ' + req.params.id);
}

exports.getStocks = (req, res, next) => {
    res.send('NOT IMPLEMENTED: Stock list GET');
}