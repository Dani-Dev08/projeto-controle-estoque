const express = require('express');
const cors = require('cors');
const produtoController = require('./controllers/produtoController');
const fornecedorController = require('./controllers/fornecedorController');
const associacaoController = require('./controllers/associacaoController');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/produtos', produtoController.create);
app.get('/produtos', produtoController.list);
app.get('/produtos/:id', produtoController.getById);
app.put('/produtos/:id', produtoController.update);
app.delete('/produtos/:id', produtoController.remove);

app.post('/fornecedores', fornecedorController.create);
app.get('/fornecedores', fornecedorController.list);
app.get('/fornecedores/:id', fornecedorController.getById);
app.put('/fornecedores/:id', fornecedorController.update);
app.delete('/fornecedores/:id', fornecedorController.remove);

app.post('/produtos/:id/fornecedores', associacaoController.associar);
app.get('/produtos/:id/fornecedores', associacaoController.listarFornecedoresDoProduto);
app.get('/fornecedores/:id/produtos', associacaoController.listarProdutosDoFornecedor);
app.delete('/produtos/:id/fornecedores/:fornecedorId', associacaoController.desassociar);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`);
});