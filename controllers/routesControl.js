const db = require('../config/db')

const addPedido = (req, res) => {
    const {id_user, id_img, id_pack, id_payment} = req.body
    db.query(
        'INSERT INTO pedidos (id_user, id_img, id_pack, id_payment) VALUES (?, ?, ?, ?)', 
        [id_user, id_img, id_pack, id_payment],
        (err, results) => {
            if(err){
                console.error('Erro ao adicionar o pedido.', err)
                res.status(500).send('Erro ao adicionar o pedido.')
                return
            }
            res.status(201).send('Pedido adicionado!')
        }
    )
}


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

// fazer o get para todos os pedidos do usuario específico

module.exports = {
    addPedido,
    users,
    orders
}