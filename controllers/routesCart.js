const db = require('../config/db')

const addCart = (req, res) => {
    const { id_usuario, id_img, id_pack, preco, tipo, id_categoria } = req.body;
    db.query('INSERT INTO carrinho (id_usuario, id_img, id_pack, preco, tipo, id_categoria) VALUES (?, ?, ?, ?, ?, ?)',
        [id_usuario, id_img, id_pack, preco, tipo, id_categoria], (err, results) => {
            if(err){
                console.error('Erro ao adicionar o item.', err)
                res.status(500).send('Erro ao adicionar o item.')
                return
            }
            res.status(201).send('Item adicionado ao carrinho!')
        }
    )
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

const delItemCart = (req, res) => {
    const {id} = req.params
    db.query ('DELETE FROM carrinho WHERE id = ?', [id], (err, results) => {
        if(err) {
            console.error('Erro ao excluir o item do carrinho', err)
            res.status(500).send('Erro ao excluir o item do carrinho')
            return
        }
        res.status(201).send('Item excluido do carrinho!')
    })
}

module.exports = {
    addCart,
    cart,
    delItemCart
}