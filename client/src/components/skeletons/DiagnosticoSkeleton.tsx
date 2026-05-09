import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

function BooleanRowSkeleton() {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex-1 space-y-1.5">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-3 w-36" />
      </div>
      <div className="flex gap-2 shrink-0">
        <Skeleton className="h-9 w-14 rounded-lg" />
        <Skeleton className="h-9 w-14 rounded-lg" />
      </div>
    </div>
  )
}

export function DiagnosticoSkeleton() {
  return (
    <div className="min-h-screen bg-background">

      {/* NavBar */}
      <div className="border-b px-4 md:px-6 h-16 flex items-center justify-between">
        <Skeleton className="h-7 w-28" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-24 hidden sm:block" />
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">

        {/* Cabeçalho da página */}
        <div className="space-y-2">
          <Skeleton className="h-7 w-56" />
          <Skeleton className="h-4 w-80" />
        </div>

        {/* Passo 1 — CNPJ */}
        <Card>
          <CardHeader className="px-5 py-5 flex flex-row items-center gap-4 pb-0">
            <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-3 w-14" />
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-64" />
            </div>
          </CardHeader>
          <CardContent className="px-6 py-6 space-y-4">
            {/* Input CNPJ com botão busca */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <div className="flex gap-2">
                <Skeleton className="h-11 flex-1 rounded-md" />
                <Skeleton className="h-11 w-11 rounded-md" />
              </div>
            </div>
            {/* Dados da empresa retornados */}
            <div className="rounded-xl border p-4 space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-4 w-28" />
            </div>
          </CardContent>
        </Card>

        {/* Passo 2 — Dados financeiros (grid 2 colunas) */}
        <Card>
          <CardHeader className="px-5 py-5 flex flex-row items-center gap-4 pb-0">
            <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-3 w-14" />
              <Skeleton className="h-5 w-44" />
              <Skeleton className="h-4 w-72" />
            </div>
          </CardHeader>
          <CardContent className="px-6 py-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Funcionários */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-11 w-full rounded-md" />
              </div>
              {/* Faturamento — col-span-2 */}
              <div className="space-y-2 sm:col-span-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-11 w-full rounded-md" />
              </div>
              {/* Compras — col-span-2 */}
              <div className="space-y-2 sm:col-span-2">
                <Skeleton className="h-4 w-56" />
                <Skeleton className="h-11 w-full rounded-md" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Passo 3 — Situação da empresa (5 linhas booleanas) */}
        <Card>
          <CardHeader className="px-5 py-5 flex flex-row items-center gap-4 pb-0">
            <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-3 w-14" />
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-4 w-80" />
            </div>
          </CardHeader>
          <CardContent className="px-6 py-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <BooleanRowSkeleton key={i} />
            ))}
          </CardContent>
        </Card>

        {/* Botão submit */}
        <Skeleton className="h-12 w-full rounded-xl" />

        {/* Rodapé */}
        <div className="flex justify-center pb-4">
          <Skeleton className="h-3 w-64" />
        </div>

      </div>
    </div>
  )
}