import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface SkillBadgeProps {
  name: string
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert"
}

export default function SkillBadge({ name, level }: SkillBadgeProps) {
  const getLevelColor = () => {
    switch (level) {
      case "Beginner":
        return "bg-muted/90 text-foreground border border-muted-foreground/55 hover:bg-muted"
      case "Intermediate":
        return "bg-primary/15 text-foreground border border-primary/70 hover:bg-primary/60"
      case "Advanced":
        return "bg-primary/30 text-foreground border border-primary/85 hover:bg-primary/75"
      case "Expert":
        return "bg-primary/80 text-foreground border border-primary hover:bg-primary/90"
      default:
        return "bg-muted/90 text-foreground border border-muted-foreground/55 hover:bg-muted"
    }
  }

  return (
    <Badge className={cn("px-4 py-1.5 rounded-md text-sm shadow-sm", getLevelColor())}>
      <span className="font-bold">{name}</span>
      <span className="ml-2 px-1.5 py-0.5 text-xs rounded-md bg-background/30 font-medium">{level}</span>
    </Badge>
  )
}
