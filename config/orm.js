

// // respond with "hello world" when a GET request is made to the homepage

// //the '/' should be getting connection.js (i think)

// //app.get('/', function (req, res) {
// //  res.sendFile(path.join('hello world'));
// //})

// //connects the connect.js to orm.js
// var connection = require('./connection.js');

// //(__dirname) --> tells you where something is



// //class stuff to use for writing queries
// var orm = {
//     //call orm.selectAll(perm1, perm2, perm3)
//   selectAll: function(tableName) {
//     var queryString = "SELECT * FROM ??";
//     connection.query(queryString, [tableName], function(err, result) {
//       console.log(result);
//     });
//   },
//   insertOne: function(tableName, colName, value) {
//       //change querystring
//     var queryString = "INSERT INTO ?? (??) VALUES (?)";
//     console.log(queryString);
//     connection.query(queryString, [tableName, colName, value], function(err, result) {
//       console.log(result);
//     });
//   },
//     //change a current burger devour status
//   updateOne: function(tableName, colName, value, ID, idNum) {
//     var queryString = "UPDATE ?? SET ?? = ?? WHERE ??=?";

//     connection.query(queryString, [tableName, colName, value, ID, idNum], function(err, result) {
//       console.log(result);
//     });
//   }
// };

// module.exports = orm;

var connection = require("./connection.js");

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

function objToSql(ob) {
  // column1=value, column2=value2,...
  var arr = [];

  for (var key in ob) {
    arr.push(key + "=" + ob[key]);
  }

  return arr.toString();
}

var orm = {
  all: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  // vals is an array of values that we want to save to cols
  // cols are the columns we want to insert the values into
  create: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  // objColVals would be the columns and values that you want to update
  // an example of objColVals would be {name: panther, sleepy: true}
  update: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  }
};

module.exports = orm;

