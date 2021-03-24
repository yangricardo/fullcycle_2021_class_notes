const express = require('express')
const mysql = require('mysql');
const app = express()
const port = 3000

function createConnection () {
    return mysql.createConnection({
        host: 'db',
        port: '3306',
        user: 'root',
        password: 'root',
        database: 'nodedb'
    });
}

function createTablePeople () {
    const connection = createConnection();
    connection.query(`CREATE TABLE people(id int not null auto_increment, name varchar(255), primary key(id));`, function (err, _result, _fields) {
        if (err) {
            console.error('Tabela [People] já existente')
        }
        else {
            console.log('Tabela [People] criada')
        }
    });
    connection.end()
}

function insertNameOnPeopleTable (name) {
    const connection = createConnection();
    connection.query(`INSERT INTO people(name) VALUES('${name}');`, function (err, _result, _fields) {
        if (err) {
            console.error('Erro ao adicionar nome')
        }
    });
    connection.end()
}

app.get('/', (req, res) => {
    const connection = createConnection();
    const { name } = req.query
    if (name) {
        insertNameOnPeopleTable(name)
    }
    connection.query("SELECT * FROM people", function (err, result, _fields) {
        if (err) {
            console.error('Erro ao consultar')
        }
        connection.end()
        res.send(`<h1>Full Cycle Rocks</h1><ul>${result.map(row => `<li>${row.name}</li>`)}</ul>`.replace(/(\,)/g, ''));
    });
})

app.listen(port, () => {
    createTablePeople()
    console.log(`Rodando na porta ${port}`)
    insertNameOnPeopleTable(`Nome aleatório gerado em ${(new Date).toUTCString()} durante a inicialização`)
    console.log('execute uma chamada HTTP.GET adicionando um query parameter `name` para adicionar novos nomes')
})
