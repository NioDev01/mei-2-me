import { Skeleton } from "@/components/ui/skeleton"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function StepTemplateSkeleton() {
  return (
    <div className="w-full space-y-8 pt-3">

      {/* HEADER SKELETON */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      {/* GRID PRINCIPAL SKELETON */}
      <div className="grid md:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-5 w-2/5" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FORM SKELETON (opcional) */}
      <Card className="border-primary">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-5 w-1/4" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/5" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/5" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-10 w-32" />
        </CardContent>
      </Card>

      {/* COMO FAZER SKELETON */}
      <Card className="border-primary">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-5 w-1/3" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
      </Card>

      {/* DICAS SKELETON */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-5 w-1/4" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
          <Skeleton className="h-4 w-1/2" />
        </CardContent>
      </Card>

    </div>
  )
}