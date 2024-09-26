const db = require('../config/db')

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

//deletar itens do cart

module.exports = {
    addCart,
    cart
}