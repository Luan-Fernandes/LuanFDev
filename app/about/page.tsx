import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Download, Mail } from "lucide-react"

import { PageTransition } from "@/components/page-transition"
import { AnimatedText } from "@/components/animated-text"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { experiences, education } from "@/lib/data"

export default function AboutPage() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="bg-muted/30 py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                Sobre Mim
              </h1>
              <AnimatedText
                text="Desenvolvedor Web"
                className="mb-6 text-xl text-muted-foreground md:text-2xl"
              />
              <p className="mb-6 text-muted-foreground">
                Sou um desenvolvedor web full-stack com mais de 1 ano de experiência em desenvolvimento de sites e aplicativos. 
                Me especializo em JavaScript, React, e Node.js, e sou apaixonado por criar experiências digitais bonitas, funcionais e centradas no usuário.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link href="/skills">
                    Minhas Habilidades
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#" download>
                    <Download className="mr-2 h-4 w-4" />
                    Download CV
                  </a>
                </Button>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-lg md:ml-auto">
                <Image
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Portrait"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">
              Experiência
            </h2>

            <div className="space-y-8">
              {experiences.map((experience, index) => (
                <div key={experience.id} className="relative pl-8">
                  {index !== experiences.length - 1 && (
                    <div className="absolute left-3 top-3 h-full w-px bg-border" />
                  )}
                  <div className="absolute left-0 top-3 h-6 w-6 rounded-full bg-primary/20 ring-2 ring-primary" />
                  <div className="rounded-lg border bg-card p-6 shadow-sm">
                    <h3 className="mb-1 text-xl font-bold">{experience.title}</h3>
                    <p className="mb-2 text-sm text-muted-foreground">
                      {experience.company} | {experience.period}
                    </p>
                    <p className="text-muted-foreground">{experience.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="bg-muted/30 py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">
              Formação
            </h2>

            <div className="space-y-8">
              {education.map((edu) => (
                <div key={edu.id} className="rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="mb-1 text-xl font-bold">{edu.degree}</h3>
                  <p className="mb-2 text-sm text-muted-foreground">
                    {edu.institution} | {edu.period}
                  </p>
                  <p className="text-muted-foreground">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Personal Information */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">
              Minha Abordagem
            </h2>

            <div className="space-y-8 text-muted-foreground">
              <p>
                Minha abordagem para o desenvolvimento web se concentra em criar interfaces intuitivas, acessíveis e responsivas que proporcionam uma experiência de usuário excepcional. Acredito que a escrita de código limpo e manutenível e a manutenção atualizada com as últimas tecnologias e práticas é fundamental para o sucesso do projeto.
              </p>
              
              <p>
                Sou apaixonado por resolver problemas e gosto do desafio de encontrar soluções criativas para problemas complexos. Valorizo a colaboração e a comunicação, e acredito que os melhores resultados vêm do trabalho em estreita colaboração com clientes e membros da equipe durante todo o processo de desenvolvimento.
              </p>

              <p>
                Quando não estou programando, você pode me encontrar explorando novas tecnologias, contribuindo para projetos de código aberto, ou aproveitando momentos ao ar livre como caminhadas e fotografia.
              </p>
            </div>

            <Separator className="my-12" />

            <div className="text-center">
              <h3 className="mb-4 text-2xl font-bold">Conectar-se</h3>
              <p className="mb-6 text-muted-foreground">
                Estou sempre aberto a discutir novos projetos, ideias criativas ou oportunidades para fazer parte da sua visão.
              </p>
              <Button asChild size="lg">
                <Link href="mailto:example@email.com">
                  <Mail className="mr-2 h-4 w-4" />
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