const checkSerial = require("../functions/check_serialkey");

// Sql
const sqlCrudClass = require("../functions/sql_crud");
const commands = new sqlCrudClass();

async function checkifuserbrought (req, res, next) {
  let checkMySerial = await checkSerial(req, res, req.get('authorization'), req.get('origin'));

  if (checkMySerial == "err") {
    res.send("error");
    return;
  } else if (checkMySerial.length == 0) {
    //cb("Serial Number Doesn't Exist");
    res.send("Serial Number Doesn't Exist");
    return;
  }

  next();
};

module.exports = checkifuserbrought;