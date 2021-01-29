const checkkeyMiddle = require("../functions/check_adminkey");

// Sql
const sqlCrudClass = require("../functions/sql_crud");
const commands = new sqlCrudClass();

async function checkifuserbrought (req, res, next) {
  let checkkey = await checkkeyMiddle(req, res, req.get('authorization'), req.get('origin'));

  if (checkkey == "err") {
    res.send("error");
    return;
  } else if (checkkey.length == 0) {
    //cb("Serial Number Doesn't Exist");
    res.send("Doesn't Exist");
    return;
  }

  next();
};

module.exports = checkifuserbrought;