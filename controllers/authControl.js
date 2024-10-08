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
        await db.promise().query(`INSERT INTO dados_user (email, password, birth_date) 
            VALUES (?, ?, ?)`, [email, hashedPassword, birth_date])
        res.status(201).send('Usuário registrado com sucesso!')
    } catch (err) {
        console.error('Erro ao registrar usuário:', err)
        res.status(500).send('Erro ao registrar usuário.')
    }
}
const registerEmployee = async (req, res) => {
    const { name, email, password, birth_date, position } = req.body
    try {
        const [existingUser] = await db.promise().query('SELECT * FROM employees WHERE email = ?', [email])
        if (existingUser.length > 0) {
            return res.status(400).send('Funcionário já registrado!')
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await db.promise().query(`INSERT INTO employees (name, email, password, birth_date, position)
            VALUES (?, ?, ?, ?, ?)`, [name, email, hashedPassword, birth_date, position])
        res.status(201).send('Funcionário registrado com sucesso!')
    } catch (err) {
        console.error('Erro ao registrar funcionário:', err)
        res.status(500).send('Erro ao registrar funcionário.')
    }
}
const login = async (req, res) => {
    const { email, password, role } = req.body
    try {
        let userQuery;
        if (role === 'user') {
            userQuery = 'SELECT * FROM dados_user WHERE email = ?';
        } else if (role === 'employee') {
            userQuery = 'SELECT * FROM employees WHERE email = ?';
        } else {
            return res.status(400).send('Posição inválida');
        }
        const [result] = await db.promise().query(userQuery, [email])
        if (result.length === 0) {
            return res.status(400).send('Credenciais Inválidas')
        }
        const isMatch = await bcrypt.compare(password, result[0].password)
        if (!isMatch) {
            return res.status(400).send('Credenciais Inválidas')
        }
        const token = jwt.sign({ userId: role === 'user' ? result[0].id : result[0].id_employee},
            process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token })
    } catch (err) {
        console.error('Erro na autenticação', err)
        res.status(500).send('Erro na autenticação')
    }
}
// const loginEmployee = async (req, res) => {
//     const {email, password} = req.body
//     try {
//         const [employee] = await db.promise().query('SELECT * FROM employees WHERE email = ?', [email])
//         if (employee.length === 0) {
//             return res.status(400).send('Credenciais Inválidas')
//         }
//         const isMatch = await bcrypt.compare(password, user[0].password)
//         if (!isMatch) {
//             return res.status(400).send('Credenciais Inválidas')
//         }
//         const token = jwt.sign({ userId: user[0].id_employee }, process.env.JWT_SECRET, { expiresIn: '1h' })
//         res.json({ token })
//     } catch (err) {
//         console.error('Erro na autenticação do funcionário', err)
//         res.status(500).send('Erro na autenticação do funcionário')
//     }
// }
const requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    try {
        const [user] = await db.promise().query('SELECT * FROM dados_user WHERE email = ?', [email])
        if (user.length === 0) {
            return res.status(404).send('Usuário não encontrado')
        }
        const token = crypto.randomBytes(20).toString('hex')
        const expireDate = new Date(Date.now() + 3600000)
        await db.promise().query('UPDATE dados_user SET resPassToken = ?, resPassExpires = ? WHERE email = ? ', [token, expireDate, email])
    const resetLink = `http://localhost:5000/reset-password/${token}`
        sendEmail(email, 'Recuperação de Senha', `Por favor, clique no link para redefinir sua senha: ${resetLink}`)
        res.send('E-mail de recuperação de senha enviado')
    } catch (err) {
        console.error('Erro ao solicitar redefinição de senha:', err)
        res.status(500).send('Erro ao solicitar redefinição de senha')
    }
    try {
        const [employee] = await db.promise().query('SELECT * FROM employees WHERE email = ?', [email])
        if (employee.length === 0) {
            return res.status(404).send('Usuário não encontrado')
        }
        const token = crypto.randomBytes(20).toString('hex')
        const expireDate = new Date(Date.now() + 3600000)
        await db.promise().query('UPDATE employees SET resPassToken = ?, resPassExpires = ? WHERE email = ? ', [token, expireDate, email])
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
        const [user] = await db.promise().query('SELECT * FROM dados_user WHERE resPassToken = ? AND resPassExpires > NOW()', [token])
    if (user.length === 0) {
            return res.status(400).send('Token inválido ou expirado')
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        await db.promise().query('UPDATE dados_user SET password = ?, resPassToken = NULL, resPassExpires = NULL WHERE id_user = ? ', [hashedPassword, user[0].id_user])
    res.send('Senha redefinida com sucesso')
    } catch (err) {
        console.error('Erro ao redefinir senha:', err)
        res.status(500).send('Erro ao redefinir senha')
    }
    try {
        const [employee] = await db.promise().query('SELECT * FROM employees WHERE resPassToken = ? AND resPassExpires > NOW()', [token])
    if (employee.length === 0) {
            return res.status(400).send('Token inválido ou expirado')
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        await db.promise().query('UPDATE employees SET password = ?, resPassToken = NULL, resPassExpires = NULL WHERE id_employee = ? ', [hashedPassword, user[0].id_employee])
    res.send('Senha redefinida com sucesso')
    } catch (err) {
        console.error('Erro ao redefinir senha:', err)
        res.status(500).send('Erro ao redefinir senha')
    }
}


module.exports = {
    registerUser,
    registerEmployee,
    login,
    // loginEmployee,
    requestPasswordReset,
    resetPassword
}