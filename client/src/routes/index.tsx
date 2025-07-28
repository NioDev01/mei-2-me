import { Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Mensagens } from '@/pages/Mensagens';
import { Login} from '@/pages/login';
import { DiaInicial } from '@/pages/DiagnosticoInicial';
import { RedefinirSenha } from '@/pages/RedefinirSenha';
import { RecuperarSenha } from '@/pages/RecuperarSenha';
import { Cadastro } from '@/pages/TelaCadastro';


export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mensagens" element={<Mensagens />} />
      <Route path="/login" element={<Login />} />
      <Route path="/diagnostico" element={<DiaInicial />} />
      <Route path="/redefinirsenha" element={<RedefinirSenha />} />
      <Route path="/recuperarsenha" element={<RecuperarSenha />} />
      <Route path="/cadastro" element={<Cadastro />} />
    </Routes>
  );
}