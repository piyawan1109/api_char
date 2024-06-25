const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
require('dotenv').config()
const app = express()

app.use(cors())
app.use(express.json())

const connection = mysql.createConnection(process.env.DATABASE_URL)

app.get('/', (req, res) => {
    res.send('Hello world!!')
})

app.get('/character', (req, res) => {
    connection.query(
        'SELECT * FROM attractions',
        function (err, results, fields) {
            res.send(results)
        }
    )
})
app.get('/character/:team', (req, res) => {
    const team = req.params.team;
    connection.query(
        'SELECT * FROM attractions WHERE team = ?', [team],
        function (err, results, fields) {
            res.send(results)
        }
    )
})

app.listen(process.env.PORT || 3000, () => {
    console.log('CORS-enabled web server listening on port 3000')
})
