

const express = require('express')
const app = express()
app.use(express.json());
app.set('view engine', 'ejs');

const port = 3000
const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)

function insert_name(name){
    connection.query(`INSERT INTO people(name) values(?)`, [name])
}

function get_names(){
    return new Promise((resolve, reject) => {
        connection.query(`SELECT name FROM people`, (err, result) => {
            if (err) return reject(err)
            resolve(result)
        })
    })
}

app.get('/', async (req,res) => {
    results = await get_names()
    res.render('index', results)
})

app.post('/api/name', (req,res)=>{
    name_param = req.body.name
    insert_name(name_param)
    res.sendStatus(200);
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})