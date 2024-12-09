const express = require("express");

const app = express();

const db = require("./db");

require("dotenv").config();

app.use(express.json());

app.post("/produtos", async (request, response) => {
    try {
        const produto = request.body;
        await db.cadastrarProduto(produto);
        response.sendStatus(201);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Erro ao cadastrar produto" });
    }
});

app.get("/produtos", async (request, response) => {
    try {
        const produtos = await db.listaDeProdutos();
        response.json(produtos);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Erro ao listar produtos" });
    }
});

app.get("/produtos/:id", async (request, response) => {
    try {
        const id = request.params.id;
        const produto = await db.consultarProduto(id);
        if (produto) {
            response.json(produto);
        } else {
            response.status(404).json({ error: "Produto não encontrado" });
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Erro ao consultar produto" });
    }
});

app.patch("/produtos/:id", async (request, response) => {
    try {
        const id = request.params.id;
        const dados = request.body;
        const resultado = await db.editarProduto(id, dados);
        if (resultado.affectedRows > 0) {
            response.sendStatus(200);
        } else {
            response.status(404).json({ error: "Produto não encontrado" });
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Erro ao editar produto" });
    }
});

app.delete("/produtos/:id", async (request, response) => {
    try {
        const id = request.params.id;
        const resultado = await db.deletarProduto(id);
        if (resultado.affectedRows > 0) {
            response.sendStatus(204);
        } else {
            response.status(404).json({ error: "Produto não encontrado" });
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Erro ao deletar produto" });
    }
});

// Verificações
app.get("/", (request, response) => {
    response.json({ message: "OK!" });
});

app.listen(process.env.PORT, () => {
    console.log("APP FUNCIONANDO");
});