'use strict';

var mysql = require('mysql');
var con = mysql.createConnection({
    host: "107.180.1.16",
    user: "fall2021group6",
    password: "group6fall2021",
    database: "cis440fall2021group6"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    let sql = "INSERT INTO terms VALUES ('SCRUM', 'Agile')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
})

