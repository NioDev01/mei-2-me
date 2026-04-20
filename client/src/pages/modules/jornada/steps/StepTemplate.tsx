import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Section = {
  title: string
  content: React.ReactNode
}

type Props = {
  header?: React.ReactNode
  sections: {
    whatIs: Section
    why: Section
    when: Section
    requirements: Section
  }
  howTo: Section
  tips: Section
}

export function StepTemplate({
  header,
  sections,
  howTo,
  tips,
}: Props) {
  return (
    <div className="w-full space-y-8 pt-3">

      {/* 🔹 HEADER CUSTOM (ex: semáforo) */}
      {header}

      {/* 🔹 GRID PRINCIPAL */}
      <div className="grid md:grid-cols-2 gap-4">

        <Card>
          <CardHeader>
            <CardTitle>{sections.whatIs.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {sections.whatIs.content}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{sections.why.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {sections.why.content}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{sections.when.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {sections.when.content}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{sections.requirements.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {sections.requirements.content}
          </CardContent>
        </Card>

      </div>

      {/* 🔹 COMO FAZER (FULL WIDTH) */}
      <Card className="border-primary">
        <CardHeader>
          <CardTitle>{howTo.title}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          {howTo.content}
        </CardContent>
      </Card>

      {/* 🔹 DICAS */}
      <Card>
        <CardHeader>
          <CardTitle>{tips.title}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-1">
          {tips.content}
        </CardContent>
      </Card>

    </div>
  )
}