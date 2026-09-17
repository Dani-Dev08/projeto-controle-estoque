import { useState, useEffect } from 'react';
import api from '../services/api';

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState({ nome: '', descricao: '', preco: '', codigo_barras: '', quantidade: '' });
  const [editandoId, setEditandoId] = useState(null);

  const formatarPreco = (valor) => {
    return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const carregar = async () => {
    const { data } = await api.get('/produtos');
    setProdutos(data);
  };

  useEffect(() => {
    carregar();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const salvar = async (e) => {
    e.preventDefault();
    try {
      if (editandoId) {
        await api.put(`/produtos/${editandoId}`, form);
      } else {
        await api.post('/produtos', form);
      }
      limpar();
      carregar();
    } catch (err) {
      alert(err.response?.data?.erro || 'Erro ao salvar produto');
    }
  };

  const editar = (p) => {
    setForm({ nome: p.nome, descricao: p.descricao || '', preco: p.preco, codigo_barras: p.codigo_barras, quantidade: p.quantidade });
    setEditandoId(p.id);
  };

  const excluir = async (id) => {
    await api.delete(`/produtos/${id}`);
    carregar();
  };

  const limpar = () => {
    setForm({ nome: '', descricao: '', preco: '', codigo_barras: '', quantidade: '' });
    setEditandoId(null);
  };

  return (
    <div>
      <h2>Produtos</h2>

       <form onSubmit={salvar} className="card form-cadastro">
        <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required />
        <input name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} />
        <input name="preco" type="number" step="0.01" placeholder="Preço" value={form.preco} onChange={handleChange} required />
        <input name="codigo_barras" placeholder="Código de barras" value={form.codigo_barras} onChange={handleChange} required />
        <input name="quantidade" type="number" min="0" placeholder="Quantidade" value={form.quantidade} onChange={handleChange} />
        <button type="submit">{editandoId ? 'Atualizar' : 'Cadastrar'}</button>
        {editandoId && <button type="button" onClick={limpar}>Cancelar</button>}
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th><th>Nome</th><th>Descrição</th><th>Preço</th><th>Código de Barras</th><th>Quantidade</th><th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nome}</td>
              <td>{p.descricao}</td>
              <td>{formatarPreco(p.preco)}</td>
              <td>{p.codigo_barras}</td>
              <td>{p.quantidade}</td>
              <td>
                <button onClick={() => editar(p)}>Editar</button>
                <button onClick={() => excluir(p.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}