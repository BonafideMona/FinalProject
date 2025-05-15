const express = require('express');
const mysql = require("mysql");
const cors = require('cors');

const app = express();
app.use(cors())

app.use(express.json());


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

// app.post('/signup', (req, res) => {
//     const {accName, password} = req.body;
//     const sql = "INSERT INTO tbl_accounts(accName, password) VALUES (?,?)";
//     db.query(sql, [accName, password], (err, result) => {
//         if (err) return res.status(500).json({error: err});
//         return res.json({message: "Signup successful"});
//     });
// });

app.post('/login', (req, res) => {
    const { accName, password } = req.body;
    const sql = "SELECT * FROM tbl_accounts WHERE accName = ? AND password = ?";
    db.query(sql, [accName, password], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.length > 0) {
            return res.json({ message: "Login successful" });
        } else {
            return res.status(401).json({ error: "Invalid credentials" });
        }
    });
});

app.listen(8801, ()=> {
    console.log("listening");
})