const db = require('../config/db')

const addCart = (req, res) => {
    const { id_usuario, id_img, id_pack, preco, id_categoria } = req.body;
    db.query('SELECT * FROM carrinho WHERE id_img = ? OR id_pack = ?', [id_img, id_pack],
        (err, results) => {
            if (err) {
                console.error('Erro ao verificar o carrinho:', err);
                return res.status(500).send('Erro ao verificar o carrinho');
            };
            if (results.length > 0) {
                return res.status(400).send('Imagem ou pack já adicionado');
            } else {
                db.query('INSERT INTO carrinho (id_usuario, id_img, id_pack, preco, id_categoria) VALUES (?, ?, ?, ?, ?)',
                    [id_usuario, id_img, id_pack, preco, id_categoria], (err, results) => {
                        if (err) {
                            console.error('Erro ao adicionar o item.', err)
                            return res.status(500).send('Erro ao adicionar o item.')
                        }
                        res.status(201).send('Item adicionado ao carrinho!')
                    }
                )
            }
        }
    );
}

const cart = (req, res) => {
    db.query('SELECT * FROM carrinho', (err, results) => {
        if (err) {
            console.error('Erro ao obter os itens do carrinho', err)
            return res.status(500).send('Erro ao obter os itens do carrinho')
        }
        res.json(results)
    })
}

const delItemCart = (req, res) => {
    const { id } = req.params
    db.query('DELETE FROM carrinho WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Erro ao excluir o item do carrinho', err)
            return res.status(500).send('Erro ao excluir o item do carrinho')
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Item não encontrado');
        } else {
            return res.status(201).send('Item excluido do carrinho!');
        }
    })
}

module.exports = {
    addCart,
    cart,
    delItemCart
}