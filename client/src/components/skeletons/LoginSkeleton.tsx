import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft } from "lucide-react"

export function LoginSkeleton() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">

      {/* Coluna esquerda */}
      <div className="flex flex-col gap-4 p-6 md:p-10">

        {/* Botão voltar */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <ArrowLeft className="h-4 w-4 opacity-30" />
          <Skeleton className="h-4 w-12" />
        </div>

        {/* Formulário centralizado */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-lg space-y-6">

            {/* Logo / título */}
            <div className="space-y-2">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-4 w-56" />
            </div>

            {/* Campo e-mail */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-11 w-full rounded-md" />
            </div>

            {/* Campo senha */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-28" />
              </div>
              <Skeleton className="h-11 w-full rounded-md" />
            </div>

            {/* Botão submit */}
            <Skeleton className="h-11 w-full rounded-md" />

            {/* Link cadastro */}
            <div className="flex justify-center gap-1">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-4 w-16" />
            </div>

          </div>
        </div>
      </div>

      {/* Coluna direita — apenas desktop */}
      <div className="bg-muted relative hidden lg:block">
        <div className="absolute inset-0 flex items-center justify-center">
          <Skeleton className="h-[500px] w-[500px] rounded-2xl" />
        </div>
      </div>

    </div>
  )
}