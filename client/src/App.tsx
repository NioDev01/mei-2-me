import { Link } from 'react-router-dom';
import { AppRoutes } from './routes';

function App() {
  return (
    <div>
      {/* Navegação */}
      <nav className="fixed z-50 top-0 left-0 flex items-center space-x-4 mb-6 bg-sidebar-primary w-full h-1/10">
        <Link to="/"><img className='mx-8 h-1/3 w-1/3' src='/mei2mew.png'></img></Link>
        <Link to="/mensagens" className="text-background hover:underline">Mensagens</Link>
      </nav>

      {/* Rotas */}
      <AppRoutes />
    </div>
  );
}

export default App;
