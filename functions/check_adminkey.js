const require_mysql_connection = require("../connection");
const fs = require("fs");

async function checkadminkey (req, res, adminkey, origin) {

    let checkadminkeyifexits;
    try {
        checkadminkeyifexits = await require_mysql_connection.awaitQuery(`SELECT * FROM users WHERE usertype = 'admin' AND adminkey = '${adminkey}' AND domain = '${origin}'`);
    
        return checkadminkeyifexits;
    } catch (err) {
        fs.appendFileSync('logfile.txt', '\n' + err.toString() + " ----- sql: " + err.sql, 'utf8');

        return "err";
    }
    
    
}



module.exports = checkadminkey;