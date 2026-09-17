const db = require('../db');

const associar = (req, res) => {
  const produtoId = req.params.id;
  const { fornecedor_id } = req.body;

  if (!fornecedor_id) {
    return res.status(400).json({ erro: 'fornecedor_id é obrigatório' });
  }

  const produto = db.prepare('SELECT * FROM produtos WHERE id = ?').get(produtoId);
  if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });

  const fornecedor = db.prepare('SELECT * FROM fornecedores WHERE id = ?').get(fornecedor_id);
  if (!fornecedor) return res.status(404).json({ erro: 'Fornecedor não encontrado' });

  const existe = db.prepare(
    'SELECT * FROM produto_fornecedor WHERE produto_id = ? AND fornecedor_id = ?'
  ).get(produtoId, fornecedor_id);
  if (existe) return res.status(409).json({ erro: 'Associação já existe' });

  db.prepare(
    'INSERT INTO produto_fornecedor (produto_id, fornecedor_id) VALUES (?, ?)'
  ).run(produtoId, fornecedor_id);

  res.status(201).json({ produto_id: Number(produtoId), fornecedor_id });
};

const listarFornecedoresDoProduto = (req, res) => {
  const fornecedores = db.prepare(`
    SELECT f.* FROM fornecedores f
    INNER JOIN produto_fornecedor pf ON pf.fornecedor_id = f.id
    WHERE pf.produto_id = ?
  `).all(req.params.id);

  res.json(fornecedores);
};

const listarProdutosDoFornecedor = (req, res) => {
  const produtos = db.prepare(`
    SELECT p.* FROM produtos p
    INNER JOIN produto_fornecedor pf ON pf.produto_id = p.id
    WHERE pf.fornecedor_id = ?
  `).all(req.params.id);

  res.json(produtos);
};

const desassociar = (req, res) => {
  const info = db.prepare(
    'DELETE FROM produto_fornecedor WHERE produto_id = ? AND fornecedor_id = ?'
  ).run(req.params.id, req.params.fornecedorId);

  if (info.changes === 0) return res.status(404).json({ erro: 'Associação não encontrada' });
  res.status(204).end();
};

module.exports = { associar, listarFornecedoresDoProduto, listarProdutosDoFornecedor, desassociar };