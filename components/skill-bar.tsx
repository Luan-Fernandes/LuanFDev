"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

interface SkillBarProps {
  name: string
  level: number
  className?: string
}

export function SkillBar({ name, level, className }: SkillBarProps) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const percentage = Math.min(Math.max(level, 0), 100)

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-sm text-muted-foreground">{percentage}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        {mounted ? (
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          />
        ) : (
          <div 
            className="h-full bg-primary" 
            style={{ width: `${percentage}%` }} 
          />
        )}
      </div>
    </div>
  )
}