import { useState, useEffect } from 'react';
import api from '../services/api';

export default function Fornecedores() {
  const [fornecedores, setFornecedores] = useState([]);
  const [form, setForm] = useState({ nome: '', cnpj: '', endereco: '', contato: '' });
  const [editandoId, setEditandoId] = useState(null);

  const carregar = async () => {
    const { data } = await api.get('/fornecedores');
    setFornecedores(data);
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
        await api.put(`/fornecedores/${editandoId}`, form);
      } else {
        await api.post('/fornecedores', form);
      }
      limpar();
      carregar();
    } catch (err) {
      alert(err.response?.data?.erro || 'Erro ao salvar fornecedor');
    }
  };

  const editar = (f) => {
    setForm({ nome: f.nome, cnpj: f.cnpj, endereco: f.endereco || '', contato: f.contato || '' });
    setEditandoId(f.id);
  };

  const excluir = async (id) => {
    await api.delete(`/fornecedores/${id}`);
    carregar();
  };

  const limpar = () => {
    setForm({ nome: '', cnpj: '', endereco: '', contato: '' });
    setEditandoId(null);
  };

  return (
    <div>
      <h2>Fornecedores</h2>

      <form onSubmit={salvar} className="card form-cadastro">
        <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required />
        <input name="cnpj" placeholder="CNPJ" value={form.cnpj} onChange={handleChange} required />
        <input name="endereco" placeholder="Endereço" value={form.endereco} onChange={handleChange} />
        <input name="contato" placeholder="Contato" value={form.contato} onChange={handleChange} />
        <button type="submit">{editandoId ? 'Atualizar' : 'Cadastrar'}</button>
        {editandoId && <button type="button" onClick={limpar}>Cancelar</button>}
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th><th>Nome</th><th>CNPJ</th><th>Endereço</th><th>Contato</th><th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {fornecedores.map((f) => (
            <tr key={f.id}>
              <td>{f.id}</td>
              <td>{f.nome}</td>
              <td>{f.cnpj}</td>
              <td>{f.endereco}</td>
              <td>{f.contato}</td>
              <td>
                <button onClick={() => editar(f)}>Editar</button>
                <button onClick={() => excluir(f.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}