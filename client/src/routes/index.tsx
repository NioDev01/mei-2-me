import { Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Mensagens } from '@/pages/Mensagens';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mensagens" element={<Mensagens />} />
    </Routes>
  );
}