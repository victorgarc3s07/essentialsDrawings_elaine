const db = require('../config/db')

const addImg = (req, res) => {
    const {name, description, price, id_categoria} = req.body
    db.query(
        'INSERT INTO image (name, description, price, id_categoria) VALUES (?, ?, ?, ?)',
        [name, description, price, id_categoria],
        (err, results) => {
            if(err) {console.error('Erro ao adicionar a imagem.', err)
                res.status(500).send('Erro ao adicionar a imagem.')
                return
            }
            res.status(201).send('Imagem adicionada!')
        }
    )
}

const addCategory = (req, res) => {
    const {name, description} = req.body
    db.query(
        'INSERT INTO categoria (name, description) VALUES (?, ?)',
        [name, description],
        (err, results) => {
            if(err) {console.error('Erro ao adicionar a categoria.', err)
                res.status(500).send('Erro ao adicionar a categoria.')
                return
            }
            res.status(201).send('Categoria adicionada!')
        }
    )
}

const addCart = (req, res) => {
    const {id_img, id_pack, price_img, price_pack, price_total} = req.body
    db.query(
        'INSERT INTO carrinho (id_img, id_pack, price_img, price_pack, price_total) VALUES (?, ?, ?, ?, ?)', 
        [id_img, id_pack, price_img, price_pack, price_total],
        (err, results) => {
            if(err){
                console.error('Erro ao adicionar o item.', err)
                res.status(500).send('Erro ao adicionar o item.')
                return
            }
            res.status(201).send('Item adicionado ao carrinho!')
        }
    )
}

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
    addCategory,
    addImg,
    addCart,
    addPedido,
    users,
    orders
}