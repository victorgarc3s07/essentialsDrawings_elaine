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

const addPack = (req, res) => {
    const {name, description, price, id_categoria, id_image1, id_image2, id_image3, id_image4} = req.body
    db.query(
        'INSERT INTO pack (name, description, price, id_categoria, id_image1, id_image2, id_image3, id_image4) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [name, description, price, id_categoria, id_image1, id_image2, id_image3, id_image4],
        (err, results) => {
            if(err) {console.error('Erro ao adicionar o pack.', err)
                res.status(500).send('Erro ao adicionar o pack.')
                return
            }
            res.status(201).send('Pack adicionado!')
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
    const {id_img, id_pack, price_img, price_pack} = req.body
    db.query(
        'INSERT INTO carrinho (id_img, id_pack, price_img, price_pack) VALUES (?, ?, ?, ?)', 
        [id_img, id_pack, price_img, price_pack],
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

const cart = (req, res) => {
    db.query ('SELECT * FROM carrinho', (err, results) => {
        if(err) {
            console.error('Erro ao obter os itens do carrinho', err)
            res.status(500).send('Erro ao obter os itens do carrinho')
            return
        }
        res.json(results)
    })
}

const delCategory = (req, res) => {
    const {id_categoria} = req.params
    db.query ('DELETE FROM categoria WHERE id_categoria = ?', [id_categoria], (err, results) => {
        if(err) {
            console.error('Erro ao deletar a categoria', err)
            res.status(500).send('Erro ao deletar a categoria')
            return
        }
        res.send('Categoria deletada.')
    })
}

// fazer o get para todos os pedidos do usuario específico

module.exports = {
    addCategory,
    addImg,
    addPack,
    addCart,
    addPedido,
    users,
    categories,
    images,
    packs,
    cart,
    orders,
    delCategory
}