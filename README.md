# 📦 API de Controle de Estoque

API REST para gerenciamento de estoque, com cadastro, listagem de **produtos** e **fornecedores**. Desenvolvido como **Projeto Integrador: Full Stack**.

🔗 **Repositório:** [github.com/Dani-Dev08/projeto-controle-estoque](https://github.com/Dani-Dev08/projeto-controle-estoque)

🌐 **API publicada:** [https://projeto-controle-estoque-1--liradev.replit.app](https://projeto-controle-estoque-1--liradev.replit.app)

---

## 🚀 Tecnologias

| Tecnologia | Descrição |
|---|---|
| **Node.js** | Ambiente de execução JavaScript no servidor |
| **Express** | Framework web para rotas e middlewares HTTP |
| **SQLite** (better-sqlite3) | Banco de dados relacional embarcado |
| **CORS** | Controle de acesso entre origens |
| **Insomnia** | Testes e validação dos endpoints |
| **Replit** | Hospedagem e deploy público |

---

## 📡 Endpoints

### Produtos

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/produtos` | Lista todos os produtos |
| `POST` | `/produtos` | Cadastra um novo produto |

**Exemplo de requisição (POST):**

```json
{
  "nome": "Caneta",
  "preco": 2.50,
  "codigo_de_barras": "7891234567890"
}
```

**Exemplo de resposta (201 Created):**

```json
{
  "id": 1,
  "nome": "Caneta",
  "preco": 2.50,
  "codigo_de_barras": "7891234567890"
}
```

> ⚠️ Os campos `nome`, `preco` e `codigo_de_barras` são **obrigatórios**. A API valida e rejeita cadastros incompletos.

### Fornecedores

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/fornecedores` | Lista todos os fornecedores |

---

## ⚙️ Como executar localmente

```bash
# 1. Clone o repositório
git clone https://github.com/Dani-Dev08/projeto-controle-estoque.git

# 2. Entre na pasta do backend
cd projeto-controle-estoque/backend

# 3. Instale as dependências
npm install

# 4. Inicie o servidor
node app.js
```

O servidor estará disponível em `http://localhost:3000/`.

---

## 🗂️ Estrutura do projeto

```text
projeto-controle-estoque/
├── backend/
│   ├── controllers/     # Lógica das rotas
│   ├── app.js           # Servidor Express
│   ├── db.js            # Conexão com o SQLite
│   └── package.json     # Dependências
├── frontend/            # Interface visual (etapa futura)
└── .replit              # Configuração de execução no Replit
```

---

## ✅ Testes realizados

Todos os endpoints foram validados no **Insomnia**:

- ✔️ `GET /produtos` — listagem funcional
- ✔️ `POST /produtos` — cadastro com validação de campos obrigatórios
- ✔️ `GET /fornecedores` — listagem funcional

---

## 👩‍💻 Autora

**Danielle Lira**

Projeto Integrador: Full Stack