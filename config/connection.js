var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'EGsk0314',
  database : 'burgers_db'
});
 
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

console.log("connected!!!!!!");


 


//connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//  if (error) throw error;
//  console.log('The solution is: ', results[0].solution);
//});
// 
module.exports = connection;


//function getTotalCost(time, hours){
//    return time*hours + 7;
//}
//
//
//var charge = getTotalCost(10, 4);
//
////example how to get this
//orm.selectWhere("cats","sleepy",true);

