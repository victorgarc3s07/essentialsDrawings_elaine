const db = require('../config/db')

//modificar pro usuario
const dadosUser = (req, res) => {
    db.query('SELECT * FROM user', (err, results) => {
        if (err) {
            console.error('Erro ao obter seus dados.', err)
            res.status(500).send('Erro ao obter seus dados.')
            return
        }
        res.json(results)
    })

    // app.get('/api/user-data', (req, res) => {
    //     const query = `
    //         SELECT user.id, user.nome, dados_user.dados
    //         FROM user
    //         LEFT JOIN dados_user ON user.id = dados_user.user_id
    //     `;
    
    //     db.query(query, (err, results) => {
    //         if (err) {
    //             return res.status(500).json({ error: 'Erro ao buscar dados' });
    //         }
    //         res.json(results);
    //     });
    // });

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