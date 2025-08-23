
'use client'
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Code, MessagesSquare, SquareCode } from "lucide-react"

import { AnimatedText } from "@/components/animated-text"
import { PageTransition } from "@/components/page-transition"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Project } from "@/components/project-card"
import { getGitHubProjects } from "@/lib/data"

export default function Home() {

const [projects, setProjects] = useState<Project[]>([])

useEffect(() => {
  getGitHubProjects()
    .then((res: Project[]) => {
      setProjects(res)
    })
    .catch((error) => {
      console.error('Erro:', error)
    })
}, [])
  // Featured projects (first 3)
  const featuredProjects = projects.slice(0, 3)

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-muted/30 py-24 md:py-32">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-primary/5 to-background" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <AnimatedText
              text="Criando Experiências Digitais com Código & Criatividade"
              className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
            />
            <p className="mb-8 text-xl text-muted-foreground">
            Desenvolvedor Web especializado em criar experiências digitais bonitas, funcionais e centradas no usuário
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/projects">
                  Ver Projetos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">
                  Sobre Mim
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">Meus Serviços</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
            Serviços de desenvolvimento especializados para atender às necessidades do seu projeto
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Code className="h-10 w-10 text-primary" />,
                title: "Web Development",
                description: "Desenvolvimento de sites e aplicativos web responsivos e acessíveis usando tecnologias e frameworks modernos."
              },
              {
                icon: <SquareCode className="h-10 w-10 text-primary" />,
                title: "Frontend Development",
                description: "Criação de interfaces de usuário atraentes e interativas usando HTML, CSS, JavaScript, React e outros frameworks frontend modernos."
              },
              {
                icon: <SquareCode className="h-10 w-10 text-primary" />,
                title: "BackEnd Development",
                description: "Desenvolvimento de back-end robusto e escalável usando Node.js, e outras tecnologias backend."
              }
            ].map((service, index) => (
              <div
                key={index}
                className="group rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="mb-2 text-xl font-bold">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="bg-muted/30 py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">Projetos Recentes</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
            Dê uma olhada em alguns dos meus trabalhos recentes
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md"
              >
                <div className="aspect-video w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={340}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{project.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="rounded-lg bg-card p-8 shadow-lg md:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Vamos Trabalhar Juntos</h2>
              <p className="mb-8 text-xl text-muted-foreground">
              Tem um projeto em mente? Eu adoraria ajudar a trazer ele para vida.
              </p>
              <Button asChild size="lg">
                <Link href="mailto:luandevfernandes@gmail.com">
                  Contato
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}