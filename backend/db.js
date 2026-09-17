const Database = require('better-sqlite3');
const db = new Database('estoque.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    preco REAL NOT NULL,
    codigo_barras TEXT NOT NULL,
    quantidade INTEGER NOT NULL DEFAULT 0
  )
`);

const colunas = db.prepare('PRAGMA table_info(produtos)').all();
if (!colunas.some((c) => c.name === 'quantidade')) {
  db.exec('ALTER TABLE produtos ADD COLUMN quantidade INTEGER NOT NULL DEFAULT 0');
}

db.exec(`
  CREATE UNIQUE INDEX IF NOT EXISTS idx_produtos_codigo_barras ON produtos(codigo_barras)
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS fornecedores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    cnpj TEXT NOT NULL,
    endereco TEXT,
    contato TEXT
  )
`);

db.exec(`
  CREATE UNIQUE INDEX IF NOT EXISTS idx_fornecedores_cnpj ON fornecedores(cnpj)
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS produto_fornecedor (
    produto_id INTEGER NOT NULL,
    fornecedor_id INTEGER NOT NULL,
    PRIMARY KEY (produto_id, fornecedor_id),
    FOREIGN KEY (produto_id) REFERENCES produtos(id),
    FOREIGN KEY (fornecedor_id) REFERENCES fornecedores(id)
  )
`);

module.exports = db;