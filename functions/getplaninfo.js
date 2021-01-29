const require_mysql_connection = require("../connection");
const fs = require("fs");

async function getplaninfo (req, res, key) {

    let getplan;
    try {
        getplan = await require_mysql_connection.awaitQuery(
            `SELECT * FROM plans INNER JOIN users ON users.planid = plans.planid 
            WHERE serialkey = '${key}'`
        );
    
        return getplan;
    } catch (err) {
        fs.appendFileSync('logfile.txt', '\n' + err.toString() + " ----- sql: " + err.sql, 'utf8');

        return "err";
    }
    
    
}



module.exports = getplaninfo;