const express = require("express");
const router = express.Router();
const path = require("path");
const bodyParser = require('body-parser');

const checkSerial = require("../../functions/check_serialkey");

const checkifuserbrought = require("../../middlewars/checkifuserbrought");

// body parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Sql
const sqlCrudClass = require("../../functions/sql_crud");
const commands = new sqlCrudClass();

const { body, validationResult, header } = require('express-validator');


const checkvalidation = require("../../middlewars/checkvalidation");

router.post("/addcourse", urlencodedParser,
    body('coursename').isLength({ min: 3, max: 50 }).withMessage('must be at least 3 and less than 50 chars').trim().escape(),
    header('origin').isLength({ min: 2, max: 100 }).withMessage('must be at least 20 and less than 100 chars').trim().escape(),
    header('authorization').isLength({ min: 20, max: 100 }).withMessage('must be at least 20 and less than 100 chars').trim().escape()
    , checkvalidation, checkifuserbrought, async (req, res, cb) => {
    
    

    let checkMySerial = await checkSerial(req, res, req.get('authorization'), req.get('origin'));

    let checkcoursenamesql = `SELECT * FROM courses WHERE courses.name = "${req.body['coursename']}" AND courses.uid = "${checkMySerial[0]['id']}"`;
    let checkcoursenameresult = await commands.selectData(req, res, checkcoursenamesql);

    
    if (checkcoursenameresult == "err") {
        res.send("error");
        return;
    } else if (checkcoursenameresult.length == 0) {
        let sql = `INSERT INTO courses (name, uid) VALUES ('${req.body['coursename']}', ${checkMySerial[0]['id']})`;
        let insertuserdata = await commands.inserData(req, res, sql);

        if (insertuserdata == "err") {
            res.send("Error");
            return;
        }

        res.send("course created");
        return;
    } else {
        res.send("Course Already Exist");
        return;
    }

    
})

router.post("/deletecourse", urlencodedParser,
    body('courseid').isLength({ min: 1, max: 50 }).isInt().withMessage('must be at least 1 and less than 50 chars').trim().escape(),
    header('origin').isLength({ min: 2, max: 100 }).withMessage('must be at least 20 and less than 100 chars').trim().escape(),
    header('authorization').isLength({ min: 20, max: 100 }).withMessage('must be at least 20 and less than 100 chars').trim().escape()
    , checkvalidation, checkifuserbrought, async (req, res, cb) => {


    let checkMySerial = await checkSerial(req, res, req.get('authorization'), req.get('origin'));

    let sql = `DELETE FROM courses WHERE id = ${req.body['courseid']} AND uid = ${checkMySerial[0]['id']}`
    let deleteCourseResult = await commands.deleteData(req, res, sql);

    if (deleteCourseResult == "err") {
        res.send("error");
        return;
    } else if (deleteCourseResult.affectedRows == "1") {
        res.send("course deleted");
        return;
    } else {
        res.send("Not Deleted");
        return;
    }
 
})

router.post("/editcourse", urlencodedParser,
    body('coursename').isLength({ min: 3, max: 50 }).withMessage('must be at least 3 and less than 50 chars').trim().escape(),
    header('origin').isLength({ min: 2, max: 100 }).withMessage('must be at least 20 and less than 100 chars').trim().escape(),
    header('authorization').isLength({ min: 20, max: 100 }).withMessage('must be at least 20 and less than 100 chars').trim().escape()
    , checkvalidation, checkifuserbrought, async (req, res, cb) => {

    
    let checkMySerial = await checkSerial(req, res, req.get('authorization'), req.get('origin'));

    let sql = `UPDATE courses SET name = "${req.body.coursename}" WHERE id = ${req.body['courseid']} AND uid = ${checkMySerial[0]['id']}`
    let editCourseResult = await commands.updateData(req, res, sql);
    
    if (editCourseResult == "err") {
        res.send("error");
        return;
    } else {
        res.send("course edited");
        return;
    }
    
    
})

router.get("/getmycourses",
    header('origin').isLength({ min: 2, max: 100 }).withMessage('must be at least 20 and less than 100 chars').trim().escape(),
    header('authorization').isLength({ min: 20, max: 100 }).withMessage('must be at least 20 and less than 100 chars').trim().escape()
    , checkvalidation, checkifuserbrought, async (req, res, cb) => {

    let checkMySerial = await checkSerial(req, res, req.get('authorization'), req.get('origin'));
    
    let sqlmycourses = `SELECT * FROM courses WHERE courses.uid = ${checkMySerial[0]['id']}`;
    let usercourses = await commands.selectData(req, res, sqlmycourses);
    
    if (usercourses == "err") {
        res.send("error");
        return;
    } else {
        res.send(usercourses);
        return;
    }
    
})



module.exports = router;