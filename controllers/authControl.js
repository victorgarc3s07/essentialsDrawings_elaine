const crypto = require('crypto')
const db = require('../config/db')
const bcrypt = require('bcrypt')
const sendEmail = require('../services/emailService').sendEmail
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    const { name, email, password, birth_date } = req.body
    try {
        const [existingUser] = await db.promise().query('SELECT * FROM dados_user WHERE email = ?', [email])
        if (existingUser.length > 0) {
            return res.status(400).send('Usuário já registrado!')
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await db.promise().query('INSERT INTO user (name) VALUES (?)', [name])
        await db.promise().query('INSERT INTO dados_user (email, password, birth_date) VALUES (?, ?, ?)', [email, password, birth_date])
        res.status(201).send('Usuário registrado com sucesso!')
    } catch (err) {
        console.error('Erro ao registrar usuário:', err)
        res.status(500).send('Erro ao registrar usuário.')
    }
}
const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const [user] = await db.promise().query('SELECT * FROM dados_user WHERE email = ?', [email])
        if (user.length === 0) {
            return res.status(400).send('Credenciais Inválidas')
        }
        const isMatch = await bcrypt.compare(password, user[0].password)
        if (!isMatch) {
            return res.status(400).send('Credenciais Inválidas')
        }
        const token = jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.json({ token })
    } catch (err) {
        console.error('Erro na autenticação do usuário', err)
        res.status(500).send('Erro na autenticação do usuário')
    }
}
const requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    try {
        const [user] = await db.promise().query('SELECT * FROM dados_user WHERE email = ?', [email])
        if (user.length === 0) {
            return res.status(404).send('Usuário não encontrado')
        }
        const token = crypto.randomBytes(20).toString('hex')
        const expireDate = new Date(Date.now() + 3600000)
        await db.promise().query('UPDATE dados_user SET reset_password_token = ?, reset_password_expires = ? WHERE email = ? ', [token, expireDate, email])
    const resetLink = `http://localhost:5000/reset-password/${token}`
        sendEmail(email, 'Recuperação de Senha', `Por favor, clique no link para redefinir sua senha: ${resetLink}`)
        res.send('E-mail de recuperação de senha enviado')
    } catch (err) {
        console.error('Erro ao solicitar redefinição de senha:', err)
        res.status(500).send('Erro ao solicitar redefinição de senha')
    }
}
const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const [user] = await db.promise().query('SELECT * FROM dados_user WHERE reset_password_token = ? AND reset_password_expires > NOW()', [token])
    if (user.length === 0) {
            return res.status(400).send('Token inválido ou expirado')
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        await db.promise().query('UPDATE dados_user SET password = ?, reset_password_token = NULL, reset_password_expires = NULL WHERE id_user = ? ', [hashedPassword, user[0].id_user])
    res.send('Senha redefinida com sucesso')
    } catch (err) {
        console.error('Erro ao redefinir senha:', err)
        res.status(500).send('Erro ao redefinir senha')
    }
}


module.exports = {
    registerUser,
    loginUser,
    requestPasswordReset,
    resetPassword
}