import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

interface ExperienceCardProps {
  title: string
  company: string
  location: string
  type: string
  period: string
  description: string
  responsibilities: string[]
}

export default function ExperienceCard({
  title,
  company,
  location,
  type,
  period,
  description,
  responsibilities,
}: ExperienceCardProps) {
  return (
    <Card className="shadow-sm transition-transform duration-300 hover:shadow-md hover:-translate-y-1">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
          <div>
            <CardTitle className="text-xl font-bold tracking-tight">
              <span className="text-primary">{title}</span> at <span className="font-medium">{company}</span>
            </CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1 text-sm">
              <MapPin className="h-3 w-3" /> {location} • <span className="font-medium">{type}</span>
            </CardDescription>
          </div>
          <Badge className="w-fit">{period}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        <div>
          <h4 className="font-semibold mb-3 text-base">Key Responsibilities:</h4>
          <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
            {responsibilities.map((responsibility, index) => (
              <li key={index} className="text-card-foreground/90">
                {responsibility}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
