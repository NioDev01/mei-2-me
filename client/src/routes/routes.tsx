import { Routes, Route } from "react-router-dom";
import { Home } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { DiagInicial } from "@/pages/DiagnosticoInicial";
import { RedefinirSenha } from "@/pages/RedefinirSenha";
import { RecuperarSenha } from "@/pages/RecuperarSenha";
import { SignIn } from "@/pages/SignIn";
import { AppHub } from "@/pages/AppHub";
import { PrivateRoute } from "@/routes/PrivateRoute";
import { OnboardingRoute } from "./onboarding-route";

export function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route
        path='/diagnostico'
        element={
          <PrivateRoute>
            <DiagInicial />
          </PrivateRoute>
        }
      />
      <Route path='/redefinirsenha' element={<RedefinirSenha />} />
      <Route path='/recuperarsenha' element={<RecuperarSenha />} />
      <Route path='/signin' element={<SignIn />} />
      <Route
        path='/app'
        element={
          <OnboardingRoute>
            <AppHub />
          </OnboardingRoute>
        }
      />
    </Routes>
  );
}
