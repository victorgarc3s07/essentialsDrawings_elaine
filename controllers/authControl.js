const db = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = async(req, res) => {
    const {name, email, password, birth_date} = req.body
    try{
        const [existingUser] = await db.promise().query('SELECT * FROM dados_user WHERE email = ?', [email])
        if (existingUser.length > 0) {
            return res.status(400).send('Usuário já registrado!')
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await db.promise().query('INSERT INTO user (name) VALUES (?)', [name])
        await db.promise().query('INSERT INTO dados_user (email, password, birth_date) VALUES (?, ?, ?)', [email, password, birth_date])
        res.status(201).send('Usuário registrado com sucesso!')
    } catch (err){
        console.error('Erro ao registrar usuário:', err)
        res.status(500).send('Erro ao registrar usuário.')
    }
}

module.exports = {
    registerUser
}