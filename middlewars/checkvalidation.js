const { body, validationResult, header } = require('express-validator');

async function checkvalidation (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.session.errs = [];
        errors.array().map(err => {
            let check = {};
            check[err.param] = err.msg
            req.session.errs.push(check);
        })
        res.send(req.session.errs)
        return;
    }
  
    next();
};
  
module.exports = checkvalidation;