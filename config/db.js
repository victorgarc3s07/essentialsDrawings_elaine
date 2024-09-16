const mysql = require('mysql2');

console.log('DB_HOST:', process.env.DB_HOST); 
console.log('DB_USER:', process.env.DB_USER); 
console.log('DB_PASS:', process.env.DB_PASS); 
console.log('DB_NAME:', process.env.DB_NAME);

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

db.connect((err) => {
    if(err) {
        return console.error('Erro na conexão com o banco de dados!', err)
    }
    console.log(`Conectado com sucesso ao banco de dados ${process.env.DB_NAME}!`)
})

module.exports = db;