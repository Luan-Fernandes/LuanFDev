"use client";

import { use, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { PageTransition } from "@/components/page-transition";
import { ProjectCard, Project } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { getGitHubProjects } from "@/lib/data";

// Get unique tags from all projects

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedTag, setSelectedTag] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const allTags = [
    "All",
    ...Array.from(new Set(projects.flatMap((project) => project.tags))),
  ];

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    if (tag === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.tags.includes(tag))
      );
    }
  };

  useEffect(() => {
    getGitHubProjects()
      .then((res: Project[]) => {
        // ✅ Aguarda com .then()
        setProjects(res);
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }, []);
  useEffect(() => {
    if (selectedTag === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.tags.includes(selectedTag))
      );
    }
  }, [projects, selectedTag]);
  return (
    <PageTransition>
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Meus Projetos
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Uma mostra de meus projetos de desenvolvimento web e aplicativos
            </p>
          </div>

          {/* Filter Tags */}
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {allTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => handleTagClick(tag)}
                className="rounded-full px-4"
              >
                {tag}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="wait">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="col-span-full py-20 text-center"
                >
                  <p className="text-xl text-muted-foreground">
                    Nenhum projeto encontrado com o filtro selecionado.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
