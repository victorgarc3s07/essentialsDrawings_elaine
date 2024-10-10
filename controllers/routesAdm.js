const db = require('../config/db')

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

const editCategory = (req, res) => {
    const {id_categoria} = req.params;
    const fields = req.body;
    const query = [];
    const values = [];
    for (const [key, value] of Object.entries(fields)) {
        query.push(`${key} = ?`);
        values.push(value);
    }
    values.push(id_categoria);
    db.query(`UPDATE categoria SET ${query.join(', ')} WHERE id_categoria = ?`, values,
        (err, results) => {
            if(err) {
                console.error('Erro ao atualizar a categoria', err)
                res.status(500).send('Erro ao atualizar a categoria')
                return
            }
            res.send('Categoria atualizada com sucesso!')
        }
    );
};

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

const addPayment = (req, res) => {
    const {name} = req.body
    db.query('INSERT INTO payment (name) VALUES (?)',
        [name],
        (err, results) => {
            if(err){
                console.error('Erro ao adicionar o método de pagamento.', err)
                res.status(500).send('Erro ao adicionar o método de pagamento.')
                return
            }
            res.status(201).send('Método de pagamento adicionado!')
        }
    )
}

const payments = (req, res) => {
    db.query('SELECT * FROM payment', (err, results) => {
        if(err) {
            console.error('Erro ao obter métodos de pagamento', err)
            res.status(500).send('Erro ao obter métodos de pagamento')
            return
        }
        res.json(results)
    })
}

const editPayment = (req, res) => {
    const {id_payment} = req.params;
    const fields = req.body;
    const query = [];
    const values = [];
    for (const [key, value] of Object.entries(fields)) {
        query.push(`${key} = ?`);
        values.push(value);
    }
    values.push(id_payment);
    db.query(`UPDATE payment SET ${query.join(', ')} WHERE id_payment = ?`, values, (err, results) => {
        if(err){
            console.error('Erro ao atualizar a categoria', err)
            res.status(500).send('Erro ao atualizar a categoria')
            return
        }
        res.send('Método de pagamento atualizado com sucesso!')
    })
}

const delPayment = (req, res) => {
    const {id_payment} = req.params
    db.query ('DELETE FROM payment WHERE id_payment = ?', [id_payment], (err, results) => {
        if(err) {
            console.error('Erro ao deletar o método de pagamento', err)
            res.status(500).send('Erro ao deletar o método de pagamento')
            return
        }
        res.send('Método de pagamento deletado.')
    })
}

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

const editImg = (req, res) => {
    const {id_image} = req.params;
    const fields = req.body;
    const query = [];
    const values = [];
    for (const [key, value] of Object.entries(fields)){
        query.push(`${key} = ?`);
        values.push(value);
    }
    values.push(id_image);
    db.query(`UPDATE image SET ${query.join(', ')} WHERE id_image = ?`, values, (err, results) => {
        if(err){
            console.error('Erro ao atualizar a imagem.', err)
            res.status(500).send('Erro ao atualizar a imagem.')
            return;
        }
        res.send('Imagem atualizada com sucesso!')
    })
}

const delImg = (req, res) => {
    const {id_image} = req.params;
    db.query('DELETE FROM image WHERE id_image = ?', [id_image], (err, results) => {
        if(err) {
            console.error('Erro ao deletar a imagem.', err);
            res.status(500).send('Erros ao deletar a imagem.');
            return;
        }
        res.send('Imagem deletada com sucesso!')
    })
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

const editPack = (req, res) => {
    const {id_pack} = req.params;
    const fields = req.body;
    const query = [];
    const values = [];
    for(const [key, value] of Object.entries(fields)){
        query.push(`${key} = ?`);
        values.push(value);
    }
    values.push(id_pack);
    db.query(`UPDATE pack SET ${query.join(', ')} WHERE id_pack = ?`, values, (err, results) => {
        if(err) {
            console.error('Erro ao atualizar o pack.', err);
            res.status(500).send('Erro ao atualizar o pack.');
            return;
        }
        res.send('Pack atualizado com sucesso!')
    })
}

const delPack = (req, res) => {
    const {id_pack} = req.params;
    db.query('DELETE FROM pack WHERE id_pack = ?', [id_pack], (err, results) => {
        if(err){
            console.error('Erro ao deletar o pack.', err);
            res.status(500).send('Erro ao deletar o pack.');
            return;
        }
        res.send('Pack deletado com sucesso!')
    })
}

const addEmployee = (req, res) => {
    const {name, email, password, birth_date, position} = req.body;
    db.query('INSERT INTO employees (name, email, password, birth_date, position) VALUES (?, ?, ?, ?, ?)',
        [name, email, password, birth_date, position],
        (err, results) => {
            if(err){
                console.error('Erro ao cadastrar funcionário.', err)
                res.stutus(500).send('Erro ao cadastrar funcionário.')
                return;
            }
            res.send('Funcionário cadastrado com sucesso!')
        }
    )
}

const delEmployee = (req, res) => {
    const {id_employee} = req.params;
    db.query('DELETE FROM employees WHERE id_employee = ?', [id_employee], (err, results) => {
        if(err) {
            console.error('Erro ao deletar funcionário.', err)
            res.status(500).send('Erro ao deletar funcionário.')
            return;
        }
        res.send('Funcionário deletado com sucesso!')
    })
}

const employees = (req, res) => {
    db.query('SELECT * FROM employees', (err, results) => {
        if (err) {
            console.error('Erro ao obter os funcionários cadastrados', err)
            res.status(500).send('Erro ao obter os funcionários cadastrados')
            return
        }
        res.json(results)
    })
}

const editEmployee = (req, res) => {
    const {id_employee} = req.params;
    const {position} = req.body;
    if(!position){
        res.status(400).send('Apenas o campo cargo é editável.')
        return;
    }
    db.query('UPDATE employees SET position = ? WHERE id_employee = ?', [id_employee, position], (err, results) => {
        if(err) {
            console.error('Erro ao atualizar o cargo.', err);
            res.status(500).send('Erro ao atualizar o cargo.');
            return;
        }
        res.send('Cargo atualizado com sucesso!')
    })
}

// const addOrder = (req, res) => {
//     const { id_user, id_payment } = req.body;
//     db.query('SELECT * FROM carrinho', (err, results) => {
//       if (err) {
//         console.error('Erro ao buscar os itens do carrinho', err);
//         res.status(500).send('Erro ao buscar os itens do carrinho');
//         return
//       }
//       let price_total = 0;
//         results.forEach((item) => {
//             price_total += (Number(item.price_img).toFixed(2) || 0) + (Number(item.price_pack).toFixed(2) || 0);
//             console.log("Total de itens no carrinho:", results);
//             console.log("Preço total calculado:", price_total);
            
//         });
//       // Inserir cada item do carrinho na tabela pedidos
//       results.forEach((item) => {
//         const {id_img, id_pack, price_img, price_pack} = item;
//         db.query(`INSERT INTO pedidos (id_user, id_img, price_img, id_pack, price_pack, price_total, id_payment)
//           VALUES (?, ?, ?, ?, ?, ?, ?)`, [id_user, id_img, price_img, id_pack, price_pack, price_total, id_payment],
//           (err, result) => {
//           if (err) {
//             console.error('Erro ao inserir os itens no pedido', err);
//             res.status(500).send('Erro ao inserir os itens no pedido');
//             return          
//             }
//         });
//       });
//       // Deletar os itens do carrinho após inserir no pedido
//       db.query('DELETE FROM carrinho', (err) => {
//         if (err) {
//           console.error('Erro ao deletar os itens do carrinho', err);
//           res.status(500).send('Erro ao deletar os itens do carrinho');
//           return ;
//         }
//         res.send('Pedido adicionado com sucesso!');
//       });
//     });
//   };
  
const addOrder = (req, res) => {
    const { id_usuario, id_payment } = req.body;
    
    // Calcula o total de preços dos itens no carrinho
    const calcTotalSql = 'SELECT SUM(preco) AS price_total FROM carrinho WHERE id_usuario = ?';
    db.query(calcTotalSql, [id_usuario], (err, totalResult) => {
        if (err) {
            console.error('Erro ao somar o total dos itens do carrinho', err);
            res.status(500).send('Erro ao somar o total dos itens do carrinho');
            return
        }

        const price_total = totalResult[0].price_total;

        // Insere o pedido
        const pedidoSql = 'INSERT INTO pedidos (id_usuario, price_total, id_payment) VALUES (?, ?, ?)';
        db.query(pedidoSql, [id_usuario, price_total, id_payment], (err, result) => {
            if (err) {
                console.error('Erro ao inserir o pedido', err);
                res.status(500).send('Erro ao inserir o pedido');
                return
            }

            const id_pedido = result.insertId;

            // Insere os itens do carrinho no itens_pedido
            const itensSql = `
                INSERT INTO itens_pedido (id_pedido, id_item, id_img, id_pack, preco, id_categoria)
                SELECT ?, id, id_img, id_pack, preco, id_categoria
                FROM carrinho
                WHERE id_usuario = ?`;
            db.query(itensSql, [id_pedido, id_usuario], (err, result) => {
                if (err) {
                    console.error('Erro ao inserir os itens do carrinho', err);
                    res.status(500).send('Erro ao inserir os itens do carrinho');
                    return
                }

                // Deleta o carrinho após criar o pedido
                const deleteCarrinhoSql = 'DELETE FROM carrinho WHERE id_usuario = ?';
                db.query(deleteCarrinhoSql, [id_usuario], (err, result) => {
                    if (err) {
                        console.error('Erro ao deletar os itens do carrinho', err);
                        res.status(500).send('Erro ao deletar os itens do carrinho');
                        return
                    }
                    res.send('Pedido adicionado com sucesso!')
                });
            });
        });
    });
};

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

const categoriaDeletada = (req, res) => {
    db.query('SELECT * FROM dat_del_category', (err, results) => {
        if (err) {
            console.error('Erro ao obter os dados de backup de categoria deletada', err)
            res.status(500).send('Erro ao obter os dados de backup de categoria deletada')
            return
        }
        res.json(results)
    })
}



// fazer o get para todos os pedidos do usuario específico

module.exports = {
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
    addOrder, //corrigir
    addEmployee,
    employees,
    editEmployee,
    delEmployee,
    users,
    orders, //corrigir
    categoriaDeletada
}