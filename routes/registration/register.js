const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const require_mysql_connection = require("../../connection");

const bodyParser = require('body-parser');

// body parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const paypal = require('paypal-rest-sdk');

const config = require("../../config.json");

paypal.configure({
  'mode': config['paypal']['mode'], //sandbox or live
  'client_id': config['paypal']['client_id'],
  'client_secret': config['paypal']['client_secret']
});

const checkplanMiddle = require("../../functions/check_ifplanexists");
const checkvalidation = require("../../middlewars/checkvalidation");

const { body, validationResult, header } = require('express-validator');



router.post('/pay', urlencodedParser, 
    body('plan_planid').isLength({ min: 1, max: 20 }).withMessage('must be at least 1 and less than 20 chars').trim().escape(),
    body('user_email').isLength({ min: 1, max: 50 }).withMessage('must be at least 1 and less than 50 chars').trim().escape(),
    body('user_domain').isLength({ min: 1, max: 50 }).withMessage('must be at least 1 and less than 50 chars').trim().escape(),
    header('origin').isLength({ min: 2, max: 100 }).withMessage('must be at least 20 and less than 100 chars').trim().escape(),
    header('authorization').isLength({ min: 10, max: 50 }).withMessage('must be at least 10 and less than 50 chars').trim().escape(),
    checkvalidation, async (req, res) => {

    let planinfo = await checkplanMiddle(req, res, req.body['plan_planid']);
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": config['paypal']['return_url'],
            "cancel_url": config['paypal']['cancel_url']
        },
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": planinfo[0]['planprice']
            },
            "item_list": {
                "items": [{
                    "name": "Dashboard Certification Plugin",
                    "price": planinfo[0]['planprice'],
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "description": "Dashboard Certification Plugin"
        }]
    };
    
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            fs.appendFileSync('logfile.txt', '\n' + error.toString(), 'utf8');
            console.log(error)
            res.send("Error");
            return;
        } else {
            for(let i = 0;i < payment.links.length;i++){
                if(payment.links[i].rel === 'approval_url'){
                    console.log(payment.links[i].href)
                    res.send(payment.links[i].href);
                    return;
                }
            }
        }
    });

  
});
  
const checkadminkey = require("../../middlewars/checkadminkey");

router.get('/result', checkadminkey, async (req, res) => {
    const payerId = req.query.payerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": req.query.planprice
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            fs.appendFileSync('logfile.txt', '\n paypal' + error.response['details'][0]['issue'], 'utf8');
            res.send("Error");
            return;
        } else {
            res.send(payment['id'])
            return;
        }
    });
});
  

module.exports = router;