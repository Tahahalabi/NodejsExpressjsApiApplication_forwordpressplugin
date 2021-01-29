const require_mysql_connection = require("../connection");
const fs = require("fs");

async function countusercourses (req, res, key) {

    let countusercourses;
    try {
        countusercourses = await require_mysql_connection.awaitQuery(
            `SELECT COUNT(courses.id) as nbofcourses FROM users INNER JOIN courses ON users.id = courses.uid 
            WHERE serialkey = '${key}'`
        );
    
        return countusercourses;
    } catch (err) {
        fs.appendFileSync('logfile.txt', '\n' + err.toString() + " ----- sql: " + err.sql, 'utf8');

        return "err";
    }
    
    
}



module.exports = countusercourses;