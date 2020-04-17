exports.get400 = (req, res, next) => {
    res.status(400).render('400');
};

exports.get404 = (req, res, next) => {
    res.status(404).render('404');
};