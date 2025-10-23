"use client"

interface SkillCardProps {
  name: string
  description: string
}

export function SkillCard({ name, description }: SkillCardProps) {
  return (
    <div className="group relative p-6 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg bg-background/50 backdrop-blur-sm">
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-foreground group-hover:text-muted-foreground transition-colors duration-300">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>

      {/* Subtle accent line that appears on hover */}
      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-foreground/20 group-hover:w-full transition-all duration-500" />
    </div>
  )
}
