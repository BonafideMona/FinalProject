const express = require('express');
const mysql = require("mysql");
const cors = require('cors');

const app = express();
app.use(cors())

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "finallab_db"
});
app.get('/', (re, res) => {
    return res.json("From Backend Side");
}) 

app.get('/')

app.get('/tbl_accounts', (req, res) => {
    const sql = "SELECT * FROM tbl_accounts";
    db.query (sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
})

app.listen(8081, ()=> {
    console.log("listening");
})