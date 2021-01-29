const express = require("express");
const router = express.Router();
const path = require("path");

const bodyParser = require('body-parser');

// body parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Main Page
router.get('/', urlencodedParser, (req, res) => {
    console.log(req.session.taha)
    req.session.taha = "hello";
    console.log(req.get('host'));

    res.send({
        name: "taha",
        last: "halabi"
    })
});

module.exports = router;