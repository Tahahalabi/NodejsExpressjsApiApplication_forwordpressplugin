const express = require("express");
const router = express.Router();
const path = require("path");

const bodyParser = require('body-parser');

// body parser
var urlencodedParser = bodyParser.urlencoded({extended: false });

const checkSerial = require("../../functions/check_serialkey");

// Sql
const sqlCrudClass = require("../../functions/sql_crud");
const commands = new sqlCrudClass();

const { body, validationResult, header } = require('express-validator');


const checkvalidation = require("../../middlewars/checkvalidation");

router.post('/', urlencodedParser, 
    body('key').isLength({ min: 20, max: 100 }).withMessage('must be at least 20 and less than 100 chars').trim().escape(),
    header('origin').isLength({ min: 2, max: 100 }).withMessage('must be at least 20 and less than 100 chars').trim().escape()
    , checkvalidation, async (req, res, cb) => {

    let checkMySerial = await checkSerial(req, res, req.body['key'], req.get('origin'));

    if (checkMySerial == "err") {
        res.send("error");
        return;
    } else if (checkMySerial.length == 1 && checkMySerial[0]['usingit'] == "no") {

        let sql = `UPDATE users SET usingit = 'yes' WHERE serialkey = "${req.body['key']}"`;
        let updateusing = await commands.updateData(req, res, sql);

        if (updateusing == "err") {
            res.send("Error");
            return;
        }

        res.send("correct credentials");
        return;

    } else if (checkMySerial.length == 1 && checkMySerial[0]['usingit'] == "yes") {
        res.send("You are using it");
        return;
    } else {
        //cb("Wrong Credentials");
        res.send("Wrong Credentials");
        return;
    }
        
})



module.exports = router;