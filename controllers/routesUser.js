const db = require('../config/db')

const dadosUser = (req, res) => {
    const { id } = req.params;
    db.query(`SELECT user.id, user.name, dados_user.email, dados_user.password,
        dados_user.birth_date FROM user JOIN dados_user ON user.id = dados_user.id_user
        WHERE user.id = ?`, [id], (err, results) => {
        if (err) {
            console.error('Erro ao obter seus dados.', err);
            return res.status(500).send('Erro ao obter seus dados.');
        }
        res.json(results);
    });
};

const editDatasUser = (req, res) => {
    const { id } = req.params;
    const fields = req.body;
    const userQuery = [];
    const dadosUserQuery = [];
    const userValues = [];
    const dadosUserValues = [];
    // Itera pelos campos fornecidos no body
    for (const [key, value] of Object.entries(fields)) {
        if (key === 'name') {
            userQuery.push(`${key} = ?`);
            userValues.push(value);
        } else if (key === 'email' || key === 'birth_date') {
            dadosUserQuery.push(`${key} = ?`);
            dadosUserValues.push(value);
        };
    };
    // Atualiza tabela 'user' se houver campos relacionados a ela
    if (userQuery.length > 0) {
        userValues.push(id); // adiciona o id no final dos valores
        db.query(`UPDATE user SET ${userQuery.join(', ')} WHERE id = ?`, userValues,
            (err, results) => {
                if (err) {
                    console.error('Erro ao atualizar o nome', err);
                    return res.status(500).send('Erro ao atualizar o nome');
                };
            }
        );
    };
    // Atualiza tabela 'dados_user' se houver campos relacionados a ela
    if (dadosUserQuery.length > 0) {
        dadosUserValues.push(id); // adiciona o id no final dos valores
        db.query(`UPDATE dados_user SET ${dadosUserQuery.join(', ')} WHERE id_user = ?`, dadosUserValues,
            (err, results) => {
                if (err) {
                    console.error('Erro ao atualizar os dados do usuário', err);
                    return res.status(500).send('Erro ao atualizar os dados do usuário');
                };
            }
        );
    };
    res.send('Dados atualizados com sucesso!');;
};

const ordersUser = (req, res) => {
    const {id_usuario} = req.body
    db.query(`SELECT pedidos.id_pedido, pedidos.price_total, pedidos.id_payment, itens_pedido.id_item,
        itens_pedido.id_img, itens_pedido.id_pack, itens_pedido.preco, itens_pedido.id_categoria
        FROM pedidos JOIN itens_pedido ON pedidos.id_pedido = itens_pedido.id_pedido WHERE pedidos.id_usuario = ?`,
        [id_usuario] , (err, results) => {
        if (err) {
            console.error('Erro ao obter os pedidos processados', err);
            return res.status(500).send('Erro ao obter os pedidos processados');
        }
        res.json(results);
    });
};

const filtroCategories = (req, res) => {
    const {id_categoria} = req.params;
    const {id_usuario} = req.body;
    db.query(`SELECT itens_pedido.id_img, itens_pedido.id_pack FROM itens_pedido INNER JOIN 
        pedidos ON itens_pedido.id_pedido = pedidos.id_pedido WHERE itens_pedido.id_categoria = ? 
        AND pedidos.id_usuario = ?`, [id_categoria, id_usuario], (err, results) => {
        if (err) {
            console.error('Erro ao filtrar por categoria', err);
            return res.status(500).send('Erro ao filtrar por categoria');
        }
        res.json(results);
    });
};

const filtroImages = (req, res) => {
    const {id_usuario} = req.params;
    db.query(`SELECT itens_pedido.id_img FROM itens_pedido INNER JOIN pedidos ON itens_pedido.id_pedido =
        pedidos.id_pedido WHERE pedidos.id_usuario = ? AND itens_pedido.id_img IS NOT NULL`,
        [id_usuario], (err, results) => {
        if (err) {
            console.error('Erro ao obter as imagens', err);
            return res.status(500).send('Erro ao obter as imagens');
        }
        res.json(results);
    });
};

const filtroPacks = (req, res) => {
    const {id_usuario} = req.params
    db.query(`SELECT itens_pedido.id_pack FROM itens_pedido INNER JOIN pedidos ON itens_pedido.id_pedido =
        pedidos.id_pedido WHERE pedidos.id_usuario = ? AND itens_pedido.id_pack IS NOT NULL`,
        [id_usuario], (err, results) => {
        if (err) {
            console.error('Erro ao obter os packs', err);
            return res.status(500).send('Erro ao obter os packs');
        }
        res.json(results);
    });
};

module.exports = {
    dadosUser,
    editDatasUser,
    filtroCategories,
    filtroImages,
    filtroPacks,
    ordersUser
}