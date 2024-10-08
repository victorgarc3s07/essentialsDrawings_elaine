const db = require('../config/db')

//consultar perfil 
const dadosUser = (req, res) => {
    const { id } = req.params
    db.query(`SELECT user.id, user.name, dados_user.email, dados_user.password,
        dados_user.birth_date FROM user JOIN dados_user ON user.id = dados_user.id_user
        WHERE user.id = ?`, [id], (err, results) => {
        if (err) {
            console.error('Erro ao obter seus dados.', err)
            res.status(500).send('Erro ao obter seus dados.')
            return
        }
        res.json(results)
    })
}
// const editDatasUser = (req, res) => {
//     const {id} = req.params;
//     const fields = req.body;
//     const query = [];
//     const values = [];
//     for (const [key, value] of Object.entries(fields)) {
//         query.push(`${key} = ?`);
//         values.push(value);
//     }
//     values.push(id);
//     db.query(`UPDATE user SET ${query.join(', ')} WHERE id = ?`, values,
//         (err, results) => {
//             if(err) {
//                 console.error('Erro ao atualizar a categoria', err)
//                 res.status(500).send('Erro ao atualizar a categoria')
//                 return
//             }
//             res.send('Categoria atualizada com sucesso!')
//         }
//     );
// };
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
        }
    }
    // Atualiza tabela 'user' se houver campos relacionados a ela
    if (userQuery.length > 0) {
        userValues.push(id); // adiciona o id no final dos valores
        db.query(
            `UPDATE user SET ${userQuery.join(', ')} WHERE id = ?`,
            userValues,
            (err, results) => {
                if (err) {
                    console.error('Erro ao atualizar o nome', err);
                    res.status(500).send('Erro ao atualizar o nome');
                    return;
                }
            }
        );
    }
    // Atualiza tabela 'dados_user' se houver campos relacionados a ela
    if (dadosUserQuery.length > 0) {
        dadosUserValues.push(id); // adiciona o id no final dos valores
        db.query(
            `UPDATE dados_user SET ${dadosUserQuery.join(', ')} WHERE id_user = ?`,
            dadosUserValues,
            (err, results) => {
                if (err) {
                    console.error('Erro ao atualizar os dados do usuário', err);
                    res.status(500).send('Erro ao atualizar os dados do usuário');
                    return;
                }
            }
        );
    }
    res.send('Dados atualizados com sucesso!');
};
const dadosEmployee = (req, res) => {
    const { id_employee } = req.params
    db.query(`SELECT id_employee, name, password, birth_date, position
        FROM employees WHERE id_employee = ?`, [id_employee], (err, results) => {
        if (err) {
            console.error('Erro ao obter seus dados.', err)
            res.status(500).send('Erro ao obter seus dados.')
            return
        }
        res.json(results)
    })
}
const editDatasEmployee = (req, res) => {
    const { id_employee } = req.params;
    const fields = req.body;
    const query = [];
    const values = [];
    for (const [key, value] of Object.entries(fields)) {
        query.push(`${key} = ?`);
        values.push(value);
    }
    values.push(id_employee);
    db.query(`UPDATE employees SET ${query.join(', ')} WHERE id_employee = ?`, values,
        (err, results) => {
            if (err) {
                console.error('Erro ao atualizar os dados', err);
                res.status(500).send('Erro ao atualizar os dados');
                return;
            }
        }
    );
    res.send('Dados atualizados com sucesso!');
};
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
    dadosUser,
    editDatasUser,
    dadosEmployee,
    editDatasEmployee,
    categories,
    images,
    packs,
    orders
}