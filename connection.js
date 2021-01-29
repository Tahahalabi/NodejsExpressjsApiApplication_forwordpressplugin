// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'dashboard_certificate',
//   multipleStatements: true
// });
 
// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }
 
//   console.log('connected as id ' + connection.threadId);
// });


const mysql = require(`mysql-await`);

const connection = mysql.createConnection({
  host     : 'mysql1008.mochahost.com',
  user     : 'maaldeeb_wpucla',
  password : 'latLPZUIQ574KSDs',
  database : 'maaldeeb_wpuclaravel',
  multipleStatements: true
});

connection.on(`error`, (err) => {
  
  console.error(`Connection error ${err.code}`);
});

/** Perform query on connection */

module.exports = connection;