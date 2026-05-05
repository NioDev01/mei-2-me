import { useAuth } from "@/context/AuthContext";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

export function OnboardingRoute({ children }: { children: JSX.Element }) {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) return <div>Carregando...</div>;

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  if (!user?.id_mei) {
    toast.info("Para acessar sua conta é obrigatório realizar o Diagnóstico Inicial 😉");
    return <Navigate to='/diagnostico' />;
  }

  return children;
}
