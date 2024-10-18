const db = require('../config/db')

const dadosEmployee = (req, res) => {
    const { id_employee } = req.params;
    db.query(`SELECT id_employee, name, password, birth_date, position
        FROM employees WHERE id_employee = ?`, [id_employee], (err, results) => {
        if (err) {
            console.error('Erro ao obter seus dados.', err);
            return res.status(500).send('Erro ao obter seus dados.');
        }
        if (results.length > 0) {
            return res.json(results);
        } else {
            return res.status(404).send('Usuário não encontrado.');
        }
    });
};
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
                return res.status(500).send('Erro ao atualizar os dados');
            }
            if (results.affectedRows === 0) {
                return res.status(404).send('Usuário não encontrado');
            } else {
                return res.send('Dados atualizados com sucesso!');
            }
        }
    );
};

const addCategory = (req, res) => {
    const { name, description } = req.body;
    db.query('SELECT * FROM categoria WHERE name = ? AND description = ?', [name, description],
        (err, results) => {
            if (err) {
                console.error('Erro ao verificar a categoria:', err);
                return res.status(500).send('Erro ao verificar a categoria');
            };
            if (results.length > 0) {
                return res.status(400).send('Categoria já registrada');
            };
        }
    );
    db.query('INSERT INTO categoria (name, description) VALUES (?, ?)', [name, description],
        (err, results) => {
            if (err) {
                console.error('Erro ao adicionar a categoria.', err);
                return res.status(500).send('Erro ao adicionar a categoria.');
            };
            res.status(201).send('Categoria adicionada!');
        }
    );
};

const categories = (req, res) => {
    db.query('SELECT * FROM categoria', (err, results) => {
        if (err) {
            console.error('Erro ao obter as categorias', err);
            return res.status(500).send('Erro ao obter as categorias');
        };
        res.json(results);
    });
};

const editCategory = (req, res) => {
    const { id_categoria } = req.params;
    const fields = req.body;
    const query = [];
    const values = [];
    for (const [key, value] of Object.entries(fields)) {
        query.push(`${key} = ?`);
        values.push(value);
    };
    values.push(id_categoria);
    db.query(`UPDATE categoria SET ${query.join(', ')} WHERE id_categoria = ?`, values,
        (err, results) => {
            if (err) {
                console.error('Erro ao atualizar a categoria', err);
                return res.status(500).send('Erro ao atualizar a categoria');
            };
            if (results.affectedRows === 0) {
                return res.status(404).send('Categoria não encontrada');
            };
            res.send('Categoria atualizada com sucesso!');
        }
    );
};

const delCategory = (req, res) => {
    const { id_categoria } = req.params;
    db.query('DELETE FROM categoria WHERE id_categoria = ?', [id_categoria],
        (err, results) => {
            if (err) {
                console.error('Erro ao deletar a categoria', err);
                return res.status(500).send('Erro ao deletar a categoria');
            };
            if (results.affectedRows === 0) {
                return res.status(404).send('Categoria não encontrada');
            };
            res.send('Categoria deletada.');
        }
    );
};

const addPayment = (req, res) => {
    const { name } = req.body;
    db.query('SELECT * FROM payment WHERE name = ?', [name],
        (err, results) => {
            if (err) {
                console.error('Erro ao verificar o método de pagamento:', err);
                return res.status(500).send('Erro ao verificar o método de pagamento');
            };
            if (results.length > 0) {
                return res.status(400).send('Método de pagamento já registrado');
            };
        }
    );
    db.query('INSERT INTO payment (name) VALUES (?)', [name],
        (err, results) => {
            if (err) {
                console.error('Erro ao adicionar o método de pagamento.', err);
                return res.status(500).send('Erro ao adicionar o método de pagamento.');
            };
            res.status(201).send('Método de pagamento adicionado!');
        }
    );
};

const payments = (req, res) => {
    db.query('SELECT * FROM payment', (err, results) => {
        if (err) {
            console.error('Erro ao obter métodos de pagamento', err);
            return res.status(500).send('Erro ao obter métodos de pagamento');
        }
        res.json(results);
    });
};

const editPayment = (req, res) => {
    const { id_payment } = req.params;
    const fields = req.body;
    const query = [];
    const values = [];
    for (const [key, value] of Object.entries(fields)) {
        query.push(`${key} = ?`);
        values.push(value);
    };
    values.push(id_payment);
    db.query(`UPDATE payment SET ${query.join(', ')} WHERE id_payment = ?`, values,
        (err, results) => {
            if (err) {
                console.error('Erro ao atualizar a categoria', err);
                return res.status(500).send('Erro ao atualizar a categoria');
            };
            if (results.affectedRows === 0) {
                return res.status(404).send('Categoria não encontrada');
            };
            res.send('Método de pagamento atualizado com sucesso!');
        }
    );
};

const delPayment = (req, res) => {
    const { id_payment } = req.params;
    db.query('DELETE FROM payment WHERE id_payment = ?', [id_payment],
        (err, results) => {
            if (err) {
                console.error('Erro ao deletar o método de pagamento', err);
                return res.status(500).send('Erro ao deletar o método de pagamento');
            }
            if (results.affectedRows === 0) {
                return res.status(404).send('Categoria não encontrada');
            };
            res.send('Método de pagamento deletado.');
        }
    );
};

const addImg = (req, res) => {
    const { name, description, price, id_categoria } = req.body;
    db.query('SELECT * FROM image WHERE name = ? AND description = ? AND price = ? AND id_categoria = ?',
        [name, description, price, id_categoria],
        (err, results) => {
            if (err) {
                console.error('Erro ao verificar as imagens:', err);
                return res.status(500).send('Erro ao verificar as imagens');
            };
            if (results.length > 0) {
                return res.status(400).send('Imagem já cadastrada');
            };
        }
    );
    db.query('INSERT INTO image (name, description, price, id_categoria) VALUES (?, ?, ?, ?)',
        [name, description, price, id_categoria],
        (err, results) => {
            if (err) {
                console.error('Erro ao adicionar a imagem.', err);
                return res.status(500).send('Erro ao adicionar a imagem.');
            };
            res.status(201).send('Imagem adicionada!');
        }
    );
};

const images = (req, res) => {
    db.query('SELECT * FROM image', (err, results) => {
        if (err) {
            console.error('Erro ao obter as imagens', err);
            return res.status(500).send('Erro ao obter as imagens');
        };
        res.json(results);
    });
};

const editImg = (req, res) => {
    const { id_image } = req.params;
    const fields = req.body;
    const query = [];
    const values = [];
    for (const [key, value] of Object.entries(fields)) {
        query.push(`${key} = ?`);
        values.push(value);
    };
    values.push(id_image);
    db.query(`UPDATE image SET ${query.join(', ')} WHERE id_image = ?`, values,
        (err, results) => {
            if (err) {
                console.error('Erro ao atualizar a imagem.', err);
                return res.status(500).send('Erro ao atualizar a imagem.');
            };
            if (results.affectedRows === 0) {
                return res.status(404).send('Imagem não encontrada.')
            };
            res.send('Imagem atualizada com sucesso!')
        }
    );
};

const delImg = (req, res) => {
    const { id_image } = req.params;
    db.query('DELETE FROM image WHERE id_image = ?', [id_image],
        (err, results) => {
            if (err) {
                console.error('Erro ao deletar a imagem.', err);
                return res.status(500).send('Erro ao deletar a imagem.');
            };
            if (results.affectedRows === 0) {
                return res.status(404).send('Imagem não encontrada.')
            };
            res.send('Imagem deletada com sucesso!')
        }
    );
};

const addPack = (req, res) => {
    const { name, description, price, id_categoria, id_image1, id_image2, id_image3, id_image4 } = req.body;
    db.query('SELECT * FROM pack WHERE name = ? AND description = ? AND price = ? AND id_categoria = ?',
        [name, description, price, id_categoria],
        (err, results) => {
            if (err) {
                console.error('Erro ao verificar o pack:', err);
                return res.status(500).send('Erro ao verificar o pack');
            };
            if (results.length > 0) {
                return res.status(400).send('Pack já cadastrado');
            };
        }
    );
    db.query(`INSERT INTO pack (name, description, price, id_categoria, id_image1, id_image2, id_image3, id_image4) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [name, description, price, id_categoria, id_image1, id_image2, id_image3, id_image4],
        (err, results) => {
            if (err) {
                console.error('Erro ao adicionar o pack.', err);
                return res.status(500).send('Erro ao adicionar o pack.');
            };
            res.status(201).send('Pack adicionado!')
        }
    );
};

const packs = (req, res) => {
    db.query('SELECT * FROM pack', (err, results) => {
        if (err) {
            console.error('Erro ao obter os packs', err);
            return res.status(500).send('Erro ao obter os packs');
        }
        res.json(results);
    });
};

const editPack = (req, res) => {
    const { id_pack } = req.params;
    const fields = req.body;
    const query = [];
    const values = [];
    for (const [key, value] of Object.entries(fields)) {
        query.push(`${key} = ?`);
        values.push(value);
    };
    values.push(id_pack);
    db.query(`UPDATE pack SET ${query.join(', ')} WHERE id_pack = ?`, values,
        (err, results) => {
            if (err) {
                console.error('Erro ao atualizar o pack.', err);
                return res.status(500).send('Erro ao atualizar o pack.');
            };
            if (results.affectedRows === 0) {
                return res.status(404).send('Pack não encontrado.');
            };
            res.send('Pack atualizado com sucesso!');
        }
    );
};

const delPack = (req, res) => {
    const { id_pack } = req.params;
    db.query('DELETE FROM pack WHERE id_pack = ?', [id_pack],
        (err, results) => {
            if (err) {
                console.error('Erro ao deletar o pack.', err);
                return res.status(500).send('Erro ao deletar o pack.');
            };
            if (results.affectedRows === 0) {
                return res.status(404).send('Pack não encontrado.')
            };
            res.send('Pack deletado com sucesso!');
        }
    );
};

const addOrder = (req, res) => {
    const { id_usuario, id_payment } = req.body;
    db.query('SELECT SUM(preco) AS price_total FROM carrinho WHERE id_usuario = ?', [id_usuario],
        (err, totalResult) => {
            if (err) {
                console.error('Erro ao somar o total dos itens do carrinho', err);
                return res.status(500).send('Erro ao somar o total dos itens do carrinho');
            };
            const price_total = totalResult[0].price_total;
            db.query('INSERT INTO pedidos (id_usuario, price_total, id_payment) VALUES (?, ?, ?)',
                [id_usuario, price_total, id_payment], (err, result) => {
                    if (err) {
                        console.error('Erro ao inserir o pedido', err);
                        return res.status(500).send('Erro ao inserir o pedido');
                    };
                    const id_pedido = result.insertId;
                    db.query(` INSERT INTO itens_pedido (id_pedido, id_item, id_img, id_pack, preco, id_categoria)
                        SELECT ?, id, id_img, id_pack, preco, id_categoria FROM carrinho WHERE id_usuario = ?`,
                        [id_pedido, id_usuario], (err, result) => {
                            if (err) {
                                console.error('Erro ao inserir os itens do carrinho', err);
                                return res.status(500).send('Erro ao inserir os itens do carrinho');
                            };
                            db.query('DELETE FROM carrinho WHERE id_usuario = ?', [id_usuario], (err, result) => {
                                if (err) {
                                    console.error('Erro ao deletar os itens do carrinho', err);
                                    return res.status(500).send('Erro ao deletar os itens do carrinho');
                                };
                                res.status(201).send('Pedido criado com sucesso!');
                            });
                        }
                    );
                }
            );
        }
    );
};

const orders = (req, res) => {
    db.query('SELECT * FROM pedidos', (err, results) => {
        if (err) {
            console.error('Erro ao obter os pedidos processados', err);
            return res.status(500).send('Erro ao obter os pedidos processados');
        };
        res.json(results);
    });
};

const users = (req, res) => {
    db.query('SELECT * FROM user', (err, results) => {
        if (err) {
            console.error('Erro ao obter os usuários cadastrados', err);
            return res.status(500).send('Erro ao obter os usuários cadastrados');
        };
        res.json(results);
    });
};

const categoriaDeletada = (req, res) => {
    db.query('SELECT * FROM dat_del_category', (err, results) => {
        if (err) {
            console.error('Erro ao obter os dados de backup de categoria deletada', err);
            return res.status(500).send('Erro ao obter os dados de backup de categoria deletada');
        };
        res.json(results);
    });
};

const filtroCategories = (req, res) => {
    const { id_categoria } = req.params;
    db.query(`SELECT image.id_image, pack.id_pack FROM image INNER JOIN 
        pack ON image.id_categoria = pack.id_categoria WHERE image.id_categoria = ?`,
        [id_categoria], (err, results) => {
            if (err) {
                console.error('Erro ao filtrar por categoria', err);
                return res.status(500).send('Erro ao filtrar por categoria');
            };
            if (results.length > 0) {
                return res.json(results);
            } else {
                return res.status(404).send('Nenhuma imagem ou pack encontrado.');
            }
        }
    );
};

const filtroImages = (req, res) => {
    db.query(`SELECT id_image FROM image`, (err, results) => {
        if (err) {
            console.error('Erro ao filtrar por imagem', err);
            return res.status(500).send('Erro ao filtrar por imagem');
        };
        res.json(results);
    });
};

const filtroPacks = (req, res) => {
    db.query(`SELECT id_pack FROM pack`, (err, results) => {
        if (err) {
            console.error('Erro ao filtrar por pack', err);
            return res.status(500).send('Erro ao filtrar por pack');
        };
        res.json(results);
    });
};

const search = (req, res) => {
    const searchTerm = req.query.termo;
    const likeSearchTerm = `%${searchTerm}%`;
    db.query(`SELECT 'image' AS type, id_image AS id, name, description, price FROM image
    WHERE name LIKE ? OR description LIKE ? UNION
    SELECT 'pack' AS type, id_pack AS id, name, description, price FROM pack
    WHERE name LIKE ? OR description LIKE ?;`,
    [likeSearchTerm, likeSearchTerm, likeSearchTerm, likeSearchTerm], (err, results) => {
        if (err) {
            console.error('Erro ao fazer a busca:', err);
            return res.status(500).json({ error: 'Erro ao fazer a busca' });
        }
        if (results.length > 0) {
            return res.json(results);
        } else {
            return res.status(404).send('Nenhuma imagem ou pack encontrado.');
        }
    });
};

module.exports = {
    dadosEmployee,
    editDatasEmployee,
    addCategory,
    categories,
    editCategory,
    delCategory,
    addPayment,
    payments,
    editPayment,
    delPayment,
    addImg,
    images,
    editImg,
    delImg,
    addPack,
    packs,
    editPack,
    delPack,
    addOrder,
    orders,
    users,
    categoriaDeletada,
    filtroCategories,
    filtroImages,
    filtroPacks,
    search
}