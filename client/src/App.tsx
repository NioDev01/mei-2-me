import { Link } from 'react-router-dom';
import { AppRoutes } from './routes';

function App() {
  return (
    <div className="p-6">
      {/* Navegação */}
      <nav className="space-x-4 mb-6">
        <Link to="/" className="text-blue-500 hover:underline">Início</Link>
        <Link to="/mensagens" className="text-blue-500 hover:underline">Mensagens</Link>
      </nav>

      {/* Rotas */}
      <AppRoutes />
    </div>
  );
}

export default App;
