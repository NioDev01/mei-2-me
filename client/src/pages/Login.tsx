import { LoginForm } from "@/pages/login/LoginForm";
import mei2me from "@/assets/mei2me.png";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/app", { replace: true });
    }
  }, [loading, isAuthenticated, navigate]);

  // Skeleton enquanto carrega sessão
  if (loading) {
    return (
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-6 p-6 md:p-10">
          {/* Botão voltar */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-16" />
          </div>

          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-lg space-y-6">
              {/* Título */}
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-2/3" />

              {/* Inputs */}
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>

              {/* Botão */}
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>

        {/* Imagem */}
        <div className="bg-muted relative hidden lg:block">
          <Skeleton className="absolute inset-0 m-auto h-[300px] w-[300px] rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        {/* Botão de voltar */}
        <Link
          to="/"
          className="flex items-center text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Link>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-lg">
            <LoginForm />
          </div>
        </div>
      </div>

      <div className="bg-muted relative hidden lg:block">
        <img
          src={mei2me}
          alt="Image"
          className="absolute inset-0 h-[500px] w-[500px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  );
}