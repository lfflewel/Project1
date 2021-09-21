// constants to run project with Node.js and express Js
const express = require('express');
const app = express();
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(session({
    secret: 'groupSix',
    resave: true,
    saveUnitialized: true
}));

 //In order to serve static css stylesheet
app.use(express.static(__dirname));

app.set('views', __dirname + '/pages');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// create connection
var con = mysql.createConnection({
    host: "107.180.1.16",
    port: "3306",
    user: "fall2021group6",
    password: "group6fall2021",
    database: "cis440fall2021group6"
});

// CONNECT TO DATABASE
con.connect(function(err) {
    if (err) {
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
});

// con.query('SELECT * FROM Accounts', function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
// });

app.get('/', function(req, res) {
    res.render('login');
  });

  app.get('/home', function(req, res) {
    con.query('SELECT * FROM Accounts', function (error, results, fields) {
        if (results.length > 0) {
            res.render('home', {test: results[0]});
        };
        res.end();
    });
  });

app.post('/login/', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    if (username && password) {

        con.query('SELECT * FROM Accounts WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
            if (results.length > 0) {
                console.log('omg you just logged in.');
                console.log(req.body.username);
                console.log(req.body.password);
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/home');
            } else {
                res.send('Incorrect Username and/or Password!');
            }
            res.end();
        });
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
});
app.get('/home', function (req, res) {
    if (req.session.loggedin) {
        res.render('home.html')
    } else {
        res.redirect('/')
    }
});

// LOG USER OUT REDIRECT TO LOGIN PAGE
app.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/');
});

app.listen(3000);
console.log('Website Sever Is Running on Port 3000. Access via LOCALHOST:3000');


// display registration form
app.get('/register', function(req, res) {
    res.render('');
});

// // store user input on post request
app.post('/register', function(req, res) {
    dataInput = { 
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        confirm_password: req.body.confirm_password
    }

// check email if already use
con.query('SELECT * FROM Users WHERE email = ?', [dataInput.email], function(err, results, fields) {
    if (err) throw err
    if(results.length > 1) {
        var msg = dataInput.email + 'was already exist';
    } else if (dataInput.confirm_password != dataInput.password) {
        var msg = "Password and Confirm Password is not Matched. Please enter again!";
    } else {
        // save data into the database
        con.query('INSERT INTO Users SET ?', [dataInput.firstname, dataInput.lastname, dataInput.email], function (err, results) {
            if (err) throw err;
        });
    var msg = "You are successfully registered";  
    }
    res.render('login.html', {alertMsg:msg});
})
})