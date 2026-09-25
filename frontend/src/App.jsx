import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Produtos from './pages/Produtos';
import Fornecedores from './pages/Fornecedores';
import Associacoes from './pages/Associacoes';

export default function App() {
  return (
    <HashRouter>
      <header className="navbar">
        <h1 className="logo">📦 Controle de Estoque</h1>
        <nav>
          <Link to="/">Produtos</Link>
          <Link to="/fornecedores">Fornecedores</Link>
          <Link to="/associacoes">Associações</Link>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Produtos />} />
          <Route path="/fornecedores" element={<Fornecedores />} />
          <Route path="/associacoes" element={<Associacoes />} />
        </Routes>
      </main>
    </HashRouter>
  );
}