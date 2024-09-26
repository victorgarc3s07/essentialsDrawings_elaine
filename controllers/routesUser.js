const db = require('../config/db')

//modificar pro usuario
const users = (req, res) => {
    db.query('SELECT * FROM user', (err, results) => {
        if (err) {
            console.error('Erro ao obter os usuários cadastrados', err)
            res.status(500).send('Erro ao obter os usuários cadastrados')
            return
        }
        res.json(results)
    })
}
//modificar pro usuario
const orders = (req, res) => {
    db.query('SELECT * FROM pedidos', (err, results) => {
        if (err) {
            console.error('Erro ao obter os pedidos processados', err)
            res.status(500).send('Erro ao obter os pedidos processados')
            return
        }
        res.json(results)
    })
}
//modificar pro usuario
const categories = (req, res) => {
    db.query('SELECT * FROM categoria', (err, results) => {
        if (err) {
            console.error('Erro ao obter as categorias', err)
            res.status(500).send('Erro ao obter as categorias')
            return
        }
        res.json(results)
    })
}
//modificar pro usuario
const images = (req, res) => {
    db.query('SELECT * FROM image', (err, results) => {
        if (err) {
            console.error('Erro ao obter as imagens', err)
            res.status(500).send('Erro ao obter as imagens')
            return
        }
        res.json(results)
    })
}
//modificar pro usuario
const packs = (req, res) => {
    db.query('SELECT * FROM pack', (err, results) => {
        if (err) {
            console.error('Erro ao obter os packs', err)
            res.status(500).send('Erro ao obter os packs')
            return
        }
        res.json(results)
    })
}


module.exports = {
    users,
    categories,
    images,
    packs,
    orders
}