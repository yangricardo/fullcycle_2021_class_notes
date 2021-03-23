const express = require('express')
const app = express()
const port = 3000

const dbConfig = {
    host: 'db',
    user: 'root',
    password: 'nodedb_pw',
    database: 'nodedb'
};

const mysql = require('mysql');
const connection = mysql.createConnection(dbConfig);

const sql = `INSERT INTO people(name) VALUES('Yang')`

connection.query(sql);
connection.end()

app.get('/', (req, res) => {
    res.send(`<h1>Hello ${req.query.name || 'Full Cycle'}</h1>`)
})

app.listen(port, () => console.log(`Rodando na porta ${port}`))