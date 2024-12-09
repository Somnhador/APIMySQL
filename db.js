require("dotenv").config();

console.log("CONNECTION_STRING:", process.env.CONNECTION_STRING);

const mysql = require("mysql2/promise");

const conexao = mysql.createPool(process.env.CONNECTION_STRING);

//Adiciona um novo produto
async function cadastrarProduto(produto) {
    const sql = "INSERT INTO produtos (nome, quantidade, preco) VALUES (?, ?, ?)";
    const [resultado] = await conexao.execute(sql, [produto.nome, produto.quantidade, produto.preco]);
    return resultado;
}

//Lista de Produtos (Consulta todos os produtos)
async function listaDeProdutos() {
    const sql = "SELECT * FROM produtos";
    const [produtos] = await conexao.execute(sql);
    return produtos;
}

//Consulta produto por ID
async function consultarProduto(id) {
    const sql = "SELECT * FROM produtos WHERE id = ?";
    const [produto] = await conexao.execute(sql, [id]);
    return produto[0];
}

//Editar Produto
async function editarProduto(id, dados) {
    const sql = `
        UPDATE produtos 
        SET nome = ?, quantidade = ?, preco = ?
        WHERE id = ?
    `;
    const [resultado] = await conexao.execute(sql, [dados.nome, dados.quantidade, dados.preco, id]);
    return resultado;
}

//Deletar Produto
async function deletarProduto(id) {
    const sql = "DELETE FROM produtos WHERE id = ?";
    const [resultado] = await conexao.execute(sql, [id]);
    return resultado;
}

//Exportar as funções
module.exports = {
    cadastrarProduto,
    listaDeProdutos,
    consultarProduto,
    editarProduto,
    deletarProduto
};