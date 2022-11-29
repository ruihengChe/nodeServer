const mysql = require('mysql')

const db = mysql.createPool({
    host: '43.142.42.27',
    user: 'root',
    password: 'jinyiken',
    database: 'chen',
})

module.exports = db;