import { Card, CardContent } from "@/components/ui/card"
import { stepConfig } from "@/pages/modules/jornada/steps/stepConfig"

type Props = {
  data: any
  onStepClick?: (step: string) => void
}

export function JornadaHeader({ data, onStepClick }: Props) {
  return (
    <Card className="sticky top-0 z-10 bg-card overflow-x-auto whitespace-nowrap">
        <CardContent className="py-4">

            <div className="flex items-center justify-between relative">

            {/* 🔵 INÍCIO — MEI */}
            <div className="flex flex-col items-center z-10">
                <div className="w-13 h-13 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-l font-bold">
                MEI
                </div>
            </div>

            {/* 🔗 LINHA BASE */}
            <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-card-foreground -translate-y-1/2 z-0" />

            {/* 🔄 ETAPAS */}
            {data.steps.map((step: any) => {
                const config = stepConfig[step.step]
                const Icon = config.icon

                const isCurrent = step.step === data.currentStep
                const isCompleted = step.status === "completed"
                const isClickable = step.status !== "locked"

                return (
                <div
                    key={step.step}
                    className="relative flex flex-col items-center z-10 group"
                >

                    {/* 🔹 ÍCONE */}
                    <div
                    onClick={() => {
                        if (isClickable) onStepClick?.(step.step)
                    }}
                    className={`
                        w-10 h-10 rounded-full flex items-center justify-center border
                        transition 
                        
                        ${isClickable ? "cursor-pointer" : "cursor-not-allowed"}
                        
                        group-hover:scale-125

                        ${isCompleted ? "bg-green-500 text-muted border-card" : ""}
                        ${isCurrent ? "bg-accent-foreground text-muted border-card scale-110" : ""}
                        ${
                        !isCompleted && !isCurrent
                            ? "bg-muted-foreground text-muted border-card border-2"
                            : ""
                        }
                    `}
                    >
                    <Icon className="w-5 h-5" />
                    </div>

                    {/* 🔹 TOOLTIP */}
                    <div
                    className="
                        absolute top-12
                        opacity-0 group-hover:opacity-100
                        transition
                        text-xs bg-black text-white px-2 py-1 rounded
                        whitespace-nowrap
                    "
                    >
                    {config.label}
                    </div>

                </div>
                )
            })}

            {/* 🟢 FINAL — ME */}
            <div className="flex flex-col items-center z-10">
                <div className="w-13 h-13 rounded-full bg-green-500 text-white flex items-center justify-center text-l font-bold">
                ME
                </div>
            </div>
            </div>

        </CardContent>
    </Card>
  )
}