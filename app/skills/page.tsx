"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  Code,
  Database,
  Layout,
  Languages,
  LineChart,
  Server,
  Settings,
  Terminal,
} from "lucide-react"

import { PageTransition } from "@/components/page-transition"
import { SkillBar } from "@/components/skill-bar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getSkills, skills as fallbackSkills } from "@/lib/data"

// Interface para as skills
interface Skill {
  name: string;
  level: number;
}

export default function SkillsPage() {
  const [activeTab, setActiveTab] = useState("frontend")
  const [mounted, setMounted] = useState(false)
  const [skills, setSkills] = useState<Skill[]>(fallbackSkills)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    setMounted(true)
    
    // Carregar skills dinâmicas do GitHub
    const loadSkills = async () => {
      try {
        const dynamicSkills = await getSkills()
        setSkills(dynamicSkills)
      } catch (error) {
        console.error("Erro ao carregar skills:", error)
        // Manter skills padrão em caso de erro
      } finally {
        setLoading(false)
      }
    }
    
    loadSkills()
  }, [])

  // Função para filtrar skills por categoria
  const getSkillsByCategory = (categorySkills: string[]) => {
    return skills.filter((skill: Skill) => 
      categorySkills.includes(skill.name)
    )
  }

  const skillCategories = [
    {
      id: "frontend",
      label: "Frontend",
      icon: <Layout className="h-4 w-4" />,
      skills: getSkillsByCategory(["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js"]),
    },
    {
      id: "backend",
      label: "Backend",
      icon: <Server className="h-4 w-4" />,
      skills: getSkillsByCategory(["Node.js", "Express", "JavaScript", "TypeScript","Handlebars","GraphQL", "Python", "Java", "C#"]),
    },
    {
      id: "database",
      label: "Database",
      icon: <Database className="h-4 w-4" />,
      skills: [
        { name: "PostgreSQL", level: 70 },
        { name: "MySQL", level: 30 },
        { name: "SQLite", level: 50 },
        { name: "SQL", level: 75 }
      ],
    },
  ]

  if (loading) {
    return (
      <PageTransition>
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Minhas Habilidades</h1>
              <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
                Carregando habilidades do GitHub...
              </p>
            </div>
          </div>
        </section>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Minhas Habilidades</h1>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Uma visão geral de minhas habilidades técnicas e proficiências
            </p>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="mx-auto max-w-4xl"
          >
            <TabsList className="mb-8 flex w-full justify-center space-x-2">
              {skillCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex items-center space-x-2"
                >
                  {category.icon}
                  <span>{category.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {skillCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <Card>
                  <CardHeader>
                    <CardTitle>{category.label} Desenvolvimento</CardTitle>
                    <CardDescription>
                      Minha proficiência em várias tecnologias {category.label.toLowerCase()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {category.skills.map((skill: Skill, index: number) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                      />
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          {/* Additional Skills Section */}
          <div className="mx-auto mt-16 max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold">Outras Habilidades & Ferramentas</h2>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {mounted && [
                {
                  icon: <Code />,
                  title: "Versionamento de Código",
                  skills: ["Git", "GitHub"],
                },
                {
                  icon: <Terminal />,
                  title: "Ferramentas de Desenvolvimento",
                  skills: ["VS Code", "npm", "Webpack", "Trae", "Docker", "Insomnia"],
                },
                {
                  icon: <Languages />,
                  title: "Languages",
                  skills: ["TypeScript", "Nest.js","SQL", "Node.js", "React", "Next.js"],
                },
                {
                  icon: <Code />,
                  title: "Frameworks",
                  skills: ["Nest.js", "Next.js", "React", "TailwindCSS", "Bootstrap"],
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="rounded-lg border bg-card p-6 shadow-sm"
                >
                  <div className="mb-4 text-primary">{item.icon}</div>
                  <h3 className="mb-4 text-xl font-bold">{item.title}</h3>
                  <ul className="space-y-2">
                    {item.skills.map((skill) => (
                      <li key={skill} className="text-muted-foreground">
                        • {skill}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Learning Section */}
      <section className="bg-muted/30 py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Aprendizado Contínuo</h2>
            <p className="mb-8 text-muted-foreground">
              Estou constantemente expandindo meus conhecimentos e me mantendo atualizado com as últimas tecnologias e tendências da indústria. 
              Aqui estão algumas áreas em que estou focando atualmente:
            </p>
            
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {mounted && ["TypeScript", "TailwindCSS", "Node.js", "SQL", "Docker", "Git"].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="rounded-lg border bg-card p-4"
                >
                  <p className="font-medium">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}