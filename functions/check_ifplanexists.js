const require_mysql_connection = require("../connection");
const fs = require("fs");

async function checkplan (req, res, planid) {

    let checkplanifexits;
    try {
        checkplanifexits = await require_mysql_connection.awaitQuery(`SELECT * FROM plans WHERE planid = ${planid}`);
    
        return checkplanifexits;
    } catch (err) {
        fs.appendFileSync('logfile.txt', '\n' + err.toString() + " ----- sql: " + err.sql, 'utf8');

        return "err";
    }
    
    
}



module.exports = checkplan;