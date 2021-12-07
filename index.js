const express = require('express');
const mysql = require('mysql');
const bodyparser = require('body-parser')

const app = express();
app.use(bodyparser.json());

// config mysql connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'node.user',
    password: 'root',
    database: 'learner',
    multipleStatements: true
});

// connect to mysql
db.connect(err => {
    if (err) {
        throw err
    }
    console.log('MySQL Connected')
});

//Creating GET Router to fetch all the learner details from the MySQL Database
app.get('/learner', (req, res) => {
    db.query('SELECT * FROM learnerdetails', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Router to GET specific learner detail from the MySQL database
app.get('/learner/:id', (req, res) => {
    db.query(`SELECT * FROM learnerdetails WHERE learner_id = ${req.params.id}`, (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});


app.listen('3000', () => {
    console.log('Server started on port 3000');
})