const db = require('../db');

const create = (req, res) => {
  const { nome, descricao, preco, codigo_barras, quantidade } = req.body;

  if (!nome || !preco || !codigo_barras) {
    return res.status(400).json({ erro: 'Nome, preço e código de barras são obrigatórios' });
  }

  const existente = db.prepare('SELECT id FROM produtos WHERE codigo_barras = ?').get(codigo_barras);
  if (existente) {
    return res.status(409).json({ erro: 'Já existe um produto com este código de barras' });
  }

  const qtd = quantidade !== undefined && quantidade !== '' ? Number(quantidade) : 0;
  if (qtd < 0) {
    return res.status(400).json({ erro: 'Quantidade não pode ser negativa' });
  }

  const stmt = db.prepare(
    'INSERT INTO produtos (nome, descricao, preco, codigo_barras, quantidade) VALUES (?, ?, ?, ?, ?)'
  );
  const info = stmt.run(nome, descricao, preco, codigo_barras, qtd);

  res.status(201).json({ id: info.lastInsertRowid, nome, descricao, preco, codigo_barras, quantidade: qtd });
};

const list = (req, res) => {
  const produtos = db.prepare('SELECT * FROM produtos').all();
  res.json(produtos);
};

const getById = (req, res) => {
  const produto = db.prepare('SELECT * FROM produtos WHERE id = ?').get(req.params.id);
  if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });
  res.json(produto);
};

const update = (req, res) => {
  const { nome, descricao, preco, codigo_barras, quantidade } = req.body;

  if (!nome || !preco || !codigo_barras) {
    return res.status(400).json({ erro: 'Nome, preço e código de barras são obrigatórios' });
  }

  const existente = db.prepare('SELECT id FROM produtos WHERE codigo_barras = ? AND id != ?').get(codigo_barras, req.params.id);
  if (existente) {
    return res.status(409).json({ erro: 'Já existe um produto com este código de barras' });
  }

  const qtd = quantidade !== undefined && quantidade !== '' ? Number(quantidade) : 0;
  if (qtd < 0) {
    return res.status(400).json({ erro: 'Quantidade não pode ser negativa' });
  }

  const info = db.prepare(
    'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, codigo_barras = ?, quantidade = ? WHERE id = ?'
  ).run(nome, descricao, preco, codigo_barras, qtd, req.params.id);

  if (info.changes === 0) return res.status(404).json({ erro: 'Produto não encontrado' });
  res.json({ id: Number(req.params.id), nome, descricao, preco, codigo_barras, quantidade: qtd });
};

const remove = (req, res) => {
  const info = db.prepare('DELETE FROM produtos WHERE id = ?').run(req.params.id);
  if (info.changes === 0) return res.status(404).json({ erro: 'Produto não encontrado' });
  res.status(204).end();
};

module.exports = { create, list, getById, update, remove };