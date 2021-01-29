const require_mysql_connection = require("../connection");
const fs = require("fs");

class sqlCommand {
    // Update
    async updateData(req, res, sql) {
        let updateQuery;
        try {
            updateQuery = await require_mysql_connection.awaitQuery(sql);
            return updateQuery;
        } catch (err) {
            fs.appendFileSync('logfile.txt', '\n' + err.toString(), 'utf8');

            return "err";
        }
    }

    async selectData(req, res, sql) {
        let selectQuery;
        try {
            selectQuery = await require_mysql_connection.awaitQuery(sql);
            return selectQuery;
        } catch (err) {

            console.log(err)
            console.log("err")
            fs.appendFileSync('logfile.txt', '\n' + err.toString(), 'utf8');
            
            return "err";
        }
    }

    async inserData(req, res, sql) {
        let insertQuery;
        try {
            insertQuery = await require_mysql_connection.awaitQuery(sql);
            
            return insertQuery;
        } catch (err) {
            fs.appendFileSync('logfile.txt', '\n' + err.toString(), 'utf8');

            return "err";
        }
    }

    async deleteData(req, res, sql) {
        let deleteQuery;
        try {
            deleteQuery = await require_mysql_connection.awaitQuery(sql);
            return deleteQuery;
        } catch (err) {
            fs.appendFileSync('logfile.txt', '\n' + err.toString(), 'utf8');

            return "err";
        }
    }

    async insertManyData(req, res, sql, values) {
        let insertQuery;
        try {
            insertQuery = await require_mysql_connection.awaitQuery(sql, [values]);
            return insertQuery;
        } catch (err) {
            fs.appendFileSync('logfile.txt', '\n' + err.toString(), 'utf8');

            return "err";
        }
    }
   
}

module.exports = sqlCommand;