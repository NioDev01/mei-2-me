import { useAuth } from "@/context/AuthContext";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import { LoginSkeleton } from "@/components/skeletons/LoginSkeleton";
import { DiagnosticoSkeleton } from "@/components/skeletons/DiagnosticoSkeleton";

export function OnboardingRoute({ children }: { children: JSX.Element }) {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    if (!isAuthenticated) return <LoginSkeleton />;

    if (!user?.id_mei) return <DiagnosticoSkeleton />;

    return <DiagnosticoSkeleton />;
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  if (!user?.id_mei) {
    toast.info("Para acessar sua conta é obrigatório realizar o Diagnóstico Inicial 😉");
    return <Navigate to='/diagnostico' />;
  }

  return children;
}