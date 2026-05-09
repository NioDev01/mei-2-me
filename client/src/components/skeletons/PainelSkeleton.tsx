import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

function ModuleCardSkeleton() {
  return (
    <Card className="p-4 space-y-3">
      {/* Ícone + badge */}
      <div className="flex items-center justify-between">
        <Skeleton className="w-8 h-8 rounded-md" />
        <Skeleton className="h-5 w-20 rounded-md" />
      </div>
      {/* Título + descrição */}
      <div className="space-y-1.5">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-3 w-48" />
      </div>
      {/* Barra de progresso */}
      <Skeleton className="h-1 w-full rounded-full" />
    </Card>
  )
}

export function PainelSkeleton() {
  return (
    <div className="space-y-4 pt-3">

      {/* Subtítulo */}
      <Skeleton className="h-4 w-80" />

      {/* Empresa */}
      <div>
        <Skeleton className="h-3 w-16 mb-3" />
        <div className="flex items-center gap-4 p-4 rounded-xl border bg-muted/50 border-gray-500/10">
          <Skeleton className="w-12 h-12 rounded-full shrink-0" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-28" />
          </div>
          {/* Badge apto/não apto */}
          <Skeleton className="h-6 w-16 rounded-md" />
        </div>
      </div>

      {/* Métricas */}
      <div>
        <Skeleton className="h-3 w-16 mb-3" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-muted/50 border border-gray-500/10 rounded-lg p-4 space-y-3"
            >
              <Skeleton className="w-8 h-8 rounded-md" />
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-5 w-20" />
            </div>
          ))}
        </div>
      </div>

      {/* Módulos */}
      <div>
        <Skeleton className="h-3 w-16 mb-3" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <ModuleCardSkeleton key={i} />
          ))}
        </div>
      </div>

    </div>
  )
}