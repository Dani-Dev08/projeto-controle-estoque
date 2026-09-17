import { useState, useEffect } from 'react';
import api from '../services/api';

export default function Associacoes() {
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [produtoId, setProdutoId] = useState('');
  const [fornecedorId, setFornecedorId] = useState('');
  const [vinculos, setVinculos] = useState([]);

  useEffect(() => {
    const carregarListas = async () => {
      const [p, f] = await Promise.all([api.get('/produtos'), api.get('/fornecedores')]);
      setProdutos(p.data);
      setFornecedores(f.data);
    };
    carregarListas();
  }, []);

  useEffect(() => {
    const carregarVinculos = async () => {
      if (!produtoId) return setVinculos([]);
      const { data } = await api.get(`/produtos/${produtoId}/fornecedores`);
      setVinculos(data);
    };
    carregarVinculos();
  }, [produtoId]);

  const associar = async (e) => {
    e.preventDefault();
    if (!produtoId || !fornecedorId) return;
    await api.post(`/produtos/${produtoId}/fornecedores`, { fornecedor_id: Number(fornecedorId) });
    const { data } = await api.get(`/produtos/${produtoId}/fornecedores`);
    setVinculos(data);
    setFornecedorId('');
  };

  const desassociar = async (fid) => {
    await api.delete(`/produtos/${produtoId}/fornecedores/${fid}`);
    const { data } = await api.get(`/produtos/${produtoId}/fornecedores`);
    setVinculos(data);
  };

  return (
    <div className="associacoes-page">
      <h2>Associação Produto / Fornecedor</h2>

      <form onSubmit={associar} className="card form-associar">
        <label>Produto: </label>
        <select value={produtoId} onChange={(e) => setProdutoId(e.target.value)}>
          <option value="">Selecione</option>
          {produtos.map((p) => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>

        <label>Fornecedor: </label>
        <select value={fornecedorId} onChange={(e) => setFornecedorId(e.target.value)}>
          <option value="">Selecione</option>
          {fornecedores.map((f) => (
            <option key={f.id} value={f.id}>{f.nome}</option>
          ))}
        </select>

        <button type="submit">Associar</button>
      </form>

      <h3>Fornecedores deste produto</h3>
      <ul>
        {vinculos.map((f) => (
          <li key={f.id}>
            {f.nome} — {f.cnpj}
            <button onClick={() => desassociar(f.id)}>Desassociar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}