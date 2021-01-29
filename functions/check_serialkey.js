const require_mysql_connection = require("../connection");
const fs = require("fs");

async function checkSerial (req, res, key, origin) {

    let checkserialifexits;
    try {
        checkserialifexits = await require_mysql_connection.awaitQuery(`SELECT * FROM users WHERE serialkey = '${key}' AND domain = '${origin}'`);
    
        return checkserialifexits;
    } catch (err) {
        fs.appendFileSync('logfile.txt', '\n' + err.toString() + " ----- sql: " + err.sql, 'utf8');
        console.log(err)
        return "err";
    }
    
    
}



module.exports = checkSerial;