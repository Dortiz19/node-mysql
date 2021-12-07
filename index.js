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

//GET Router to fetch all users
app.get('/learner', (req, res) => {
    db.query('SELECT * FROM learnerdetails', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Router to GET single user details
app.get('/learner/:id', (req, res) => {
    db.query(`SELECT * FROM learnerdetails WHERE learner_id = ${req.params.id}`, (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Router to INSERT/POST
app.post('/learner', (req, res) => {
    let learner = req.body;
    var sql = 
        `SET @learner_id = ?;
         SET @learner_name = ?;
         SET @learner_email = ?;
         SET @course_Id = ?; 
         CALL learnerAddOrEdit(@learner_id, @learner_name, @learner_email, @course_Id);`;
    db.query(sql, [learner.learner_id, learner.learner_name, learner.learner_email, learner.course_Id], (err, rows, fields) => {
    if (!err)
    rows.forEach(element => {
    if(element.constructor == Array)
    res.send('New Learner ID : '+ element[0].learner_id);
    });
    else
    console.log(err);
    })
    });

//Router to UPDATE
app.put('/learner', (req, res) => {
    let learner = req.body;
    var sql = 
        `SET @learner_id = ?;
         SET @learner_name = ?;
         SET @learner_email = ?;
         SET @course_Id = ?; 
         CALL learnerAddOrEdit(@learner_id, @learner_name, @learner_email, @course_Id);`;
    db.query(sql, [learner.learner_id, learner.learner_name, learner.learner_email, learner.course_Id], (err, rows, fields) => {
    if (!err)
    res.send('Learner Details Updated Successfully');
    else
    console.log(err);
    })
    });

//Router to DELETE
app.delete('/learner/:id', (req, res) => {
    db.query(`DELETE FROM learnerdetails WHERE learner_id = ${req.params.id}`, [req.params.id], (err, rows, fields) => {
    if (!err)
    res.send('Learner Record deleted successfully.');
    else
    console.log(err);
    })
    });
    
    

app.listen('3000', () => {
    console.log('Server started on port 3000');
})