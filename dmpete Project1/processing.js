let http = require("http");

let mysql = require("mysql");



var courseID = 02

function CreateNewCourse(){

  var course_name = document.getElementById("course")

  var con = mysql.createConnection({
    host: "107.180.1.16",
    user: "fall2021group6",
    password: "group6fall2021",
    database:"cis440fall2021group6"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    con.query("INSERT INTO Courses (courseName, accountID) VALUES (course_name, accountID)", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });
  
  



}


var course_name = "CIS425"

var accountID = 02



var con = mysql.createConnection({
  host: "107.180.1.16",
  user: "fall2021group6",
  password: "group6fall2021",
  database:"cis440fall2021group6"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!")
  let sqlQuery = `INSERT INTO Courses (courseName, courseID, accountID) VALUES ("${course_name}" , "${courseID}" , "${accountID}")`
  con.query(sqlQuery, function (err, result) {
    if (err) throw err;
    console.log("1 row inserted");
  });
});



