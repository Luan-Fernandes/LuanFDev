import * as React from "react"
import Link from "next/link"
import { Code, Github, Linkedin, Mail, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Code className="h-6 w-6" />
              <span className="text-lg font-bold">LuanDev</span>
            </div>
            <p className="text-sm text-muted-foreground">
             Desenvolvedor Web, com habilidades em TypeScript, Nest.js, Next.js, React, TailwindCSS, Node.js, SQL, Docker, Git.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Navegação</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Início
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Sobre Mim
              </Link>
              <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Projetos
              </Link>
              <Link href="/skills" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Habilidades
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Conecte-se</h3>
            <div className="flex space-x-4">
              <Link href="https://github.com/Luan-Fernandes" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://www.linkedin.com/in/luanfernandesdevfront-end/" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="mailto:luandevfernandes@gmail.com" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              Contact: luandevfernandes@gmail.com
            </p>
          </div>
        </div>
        <div className="mt-8 border-t pt-8">
          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} LuanDev. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}