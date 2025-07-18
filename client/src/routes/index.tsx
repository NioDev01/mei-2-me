import { Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Mensagens } from '@/pages/Mensagens';
import { Login} from '@/pages/login';
import { DiaInicial } from '@/pages/DiagnosticoInicial';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mensagens" element={<Mensagens />} />
      <Route path="/login" element={<Login />} />
      <Route path="/diagnostico" element={<DiaInicial />} />
    </Routes>
  );
}