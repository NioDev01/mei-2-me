import { Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Mensagens } from '@/pages/Mensagens';
import { Login } from '@/pages/Login';
import { DiagInicial } from '@/pages/DiagnosticoInicial';
import { RedefinirSenha } from '@/pages/RedefinirSenha';
import { RecuperarSenha } from '@/pages/RecuperarSenha';
import { SignIn } from '@/pages/SignIn';
import { AppHub } from '@/pages/AppHub';
import { TelaApto } from '@/pages/NaoApto';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mensagens" element={<Mensagens />} />
      <Route path="/login" element={<Login />} />
      <Route path="/diagnostico" element={<DiagInicial />} />
      <Route path="/redefinirsenha" element={<RedefinirSenha />} />
      <Route path="/recuperarsenha" element={<RecuperarSenha />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/app" element={<AppHub />} />
      <Route path="/naoapto" element={<TelaApto />} />
    </Routes>
  );
}