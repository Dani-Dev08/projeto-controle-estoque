const db = require('../db');

const create = (req, res) => {
  const { nome, cnpj, endereco, contato } = req.body;

  if (!nome || !cnpj) {
    return res.status(400).json({ erro: 'Nome e CNPJ são obrigatórios' });
  }

  const existente = db.prepare('SELECT id FROM fornecedores WHERE cnpj = ?').get(cnpj);
  if (existente) {
    return res.status(409).json({ erro: 'Já existe um fornecedor com este CNPJ' });
  }

  const stmt = db.prepare(
    'INSERT INTO fornecedores (nome, cnpj, endereco, contato) VALUES (?, ?, ?, ?)'
  );
  const info = stmt.run(nome, cnpj, endereco, contato);

  res.status(201).json({ id: info.lastInsertRowid, nome, cnpj, endereco, contato });
};

const list = (req, res) => {
  const fornecedores = db.prepare('SELECT * FROM fornecedores').all();
  res.json(fornecedores);
};

const getById = (req, res) => {
  const fornecedor = db.prepare('SELECT * FROM fornecedores WHERE id = ?').get(req.params.id);
  if (!fornecedor) return res.status(404).json({ erro: 'Fornecedor não encontrado' });
  res.json(fornecedor);
};

const update = (req, res) => {
  const { nome, cnpj, endereco, contato } = req.body;

  if (!nome || !cnpj) {
    return res.status(400).json({ erro: 'Nome e CNPJ são obrigatórios' });
  }

  const existente = db.prepare('SELECT id FROM fornecedores WHERE cnpj = ? AND id != ?').get(cnpj, req.params.id);
  if (existente) {
    return res.status(409).json({ erro: 'Já existe um fornecedor com este CNPJ' });
  }

  const info = db.prepare(
    'UPDATE fornecedores SET nome = ?, cnpj = ?, endereco = ?, contato = ? WHERE id = ?'
  ).run(nome, cnpj, endereco, contato, req.params.id);

  if (info.changes === 0) return res.status(404).json({ erro: 'Fornecedor não encontrado' });
  res.json({ id: Number(req.params.id), nome, cnpj, endereco, contato });
};

const remove = (req, res) => {
  const info = db.prepare('DELETE FROM fornecedores WHERE id = ?').run(req.params.id);
  if (info.changes === 0) return res.status(404).json({ erro: 'Fornecedor não encontrado' });
  res.status(204).end();
};

module.exports = { create, list, getById, update, remove };
