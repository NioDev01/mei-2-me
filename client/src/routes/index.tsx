import { Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Mensagens } from '@/pages/Mensagens';
import { Hub } from '@/pages/Hub';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mensagens" element={<Mensagens />} />
      <Route path="/hub" element={<Hub />} />
    </Routes>
  );
}