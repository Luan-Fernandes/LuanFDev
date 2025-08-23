import { Project } from "@/components/project-card";
import axios from "axios";

const getRepos = async () => {
  const response = await axios.get(
    "https://api.github.com/users/Luan-Fernandes/repos"
  );
  return response.data;
};

const getReposLinguagem = async (repo: string) => {
  const response = await axios.get(
    `https://api.github.com/repos/Luan-Fernandes/${repo}/languages`
  );
  return response.data;
};

// Interface para as skills
interface Skill {
  name: string;
  level: number;
}

// Função para calcular skills dinamicamente baseada nos repositórios
export const getGitHubSkills = async (): Promise<Skill[]> => {
  try {
    // Verificar se estamos no lado do cliente
    if (typeof window === 'undefined') {
      return [];
    }

    const cache = localStorage.getItem("github_skills_cache");
    const cacheTimestamp = localStorage.getItem("github_skills_cache_time");

    if (cache && cacheTimestamp) {
      const now = Date.now();
      const oneDay = 24 * 60 * 60 * 1000; 

      if (now - parseInt(cacheTimestamp, 10) < oneDay) {
        return JSON.parse(cache);
      }
    }

    const repos = await getRepos();

    // Buscar linguagens de todos os repositórios
    const reposLinguagens = await Promise.all(
      repos.map((repo: any) =>
        getReposLinguagem(repo.name).then((langs) => ({
          repoName: repo.name,
          languages: langs,
        }))
      )
    );

    // Agregar todos os bytes por linguagem
    const languageBytes: { [key: string]: number } = {};

    reposLinguagens.forEach((repo) => {
      Object.entries(repo.languages).forEach(([language, bytes]) => {
        if (languageBytes[language]) {
          languageBytes[language] += bytes as number;
        } else {
          languageBytes[language] = bytes as number;
        }
      });
    });

    // Calcular total de bytes
    const totalBytes = Object.values(languageBytes).reduce((sum, bytes) => sum + bytes, 0);

    // Calcular percentuais e criar array de skills
    const skills: Skill[] = Object.entries(languageBytes)
      .map(([language, bytes]) => ({
        name: language,
        level: Math.round((bytes / totalBytes) * 100 * 100) / 100, // Arredondar para 2 casas decimais
      }))
      .sort((a, b) => b.level - a.level); // Ordenar por nível decrescente

    // Salvar no localStorage (apenas no lado do cliente)
    if (typeof window !== 'undefined') {
      localStorage.setItem("github_skills_cache", JSON.stringify(skills));
      localStorage.setItem("github_skills_cache_time", Date.now().toString());
    }

    return skills;
  } catch (error) {
    console.error("Erro ao calcular skills do GitHub:", error);
    // Retornar skills padrão em caso de erro
    return [
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "React", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "Node.js", level: 80 },
      { name: "HTML/CSS", level: 75 },
    ];
  }
};

export const getGitHubProjects = async (): Promise<Project[]> => {
  try {
    // Verificar se estamos no lado do cliente
    if (typeof window === 'undefined') {
      return [];
    }

    const cache = localStorage.getItem("github_projects_cache");
    const cacheTimestamp = localStorage.getItem("github_projects_cache_time");

    if (cache && cacheTimestamp) {
      const now = Date.now();
      const oneDay = 24 * 60 * 60 * 1000; 

      if (now - parseInt(cacheTimestamp, 10) < oneDay) {
        return JSON.parse(cache);
      }
    }

    const repos = await getRepos();

    const reposLinguagens = await Promise.all(
      repos.map((repo: any) =>
        getReposLinguagem(repo.name).then((langs) => ({
          repoName: repo.name,
          languages: Object.keys(langs),
        }))
      )
    );

    const githubProjects: Project[] = repos.map((repo: any) => {
      const linguagensDoRepo = reposLinguagens.find(
        (item) => item.repoName === repo.name
      )?.languages || ["JavaScript"];

      return {
        id: repo.id.toString(),
        title: repo.name,
        description:
          repo.description || "Projeto desenvolvido e disponível no GitHub",
        image: repo.owner.avatar_url,
        tags: linguagensDoRepo,
        demoUrl: repo.homepage || repo.html_url,
        repoUrl: repo.html_url,
      };
    });

    // Salva no localStorage (apenas no lado do cliente)
    if (typeof window !== 'undefined') {
      localStorage.setItem("github_projects_cache", JSON.stringify(githubProjects));
      localStorage.setItem("github_projects_cache_time", Date.now().toString());
    }

    return githubProjects;
  } catch (error) {
    console.error("Erro ao buscar repositórios:", error);
    return [];
  }
};

// Skills dinâmicas baseadas nos repositórios do GitHub
export const getSkills = async (): Promise<Skill[]> => {
  return await getGitHubSkills();
};

// Skills estáticas como fallback (mantidas para compatibilidade)
export const skills = [
  { name: "HTML/CSS", level: 72.91 },
  { name: "JavaScript", level: 90 },
  { name: "TypeScript", level: 85 },
  { name: "React", level: 90 },
  { name: "Next.js", level: 85 },
  { name: "Node.js", level: 80 },
  { name: "Express", level: 75 },
  { name: "MongoDB", level: 70 },
  { name: "PostgreSQL", level: 65 },
  { name: "GraphQL", level: 60 },
  { name: "AWS", level: 50 },
  { name: "Docker", level: 55 },
];
export const experiences = [
  {
    id: "1",
    title: "Estagiário de Desenvolvimento Web",
    company: "Marques Consult",
    period: "Fev/2025 - Ago/2025",
    description:
      "Desenvolvimento de Plataformas e aplicativos web, voltados para area da Saúde e-SUS, responsivos e acessíveis usando tecnologias e frameworks modernos.",
  },
  {
    id: "2",
    title: "Desenvolvedor Full-Stack Junior",
    company: "Marques Consult",
    period: "Ago/2025 - Atual",
    description:
      "Desenvolvimento de Plataformas e aplicativos web, voltados para area da Saúde e-SUS, responsivos e acessíveis usando tecnologias e frameworks modernos.",
  },
  
];

export const education = [
  {
    id: "1",
    degree: "Tecnico em Informatica",
    institution: "Escola Técnica Estadual Jose Humberto de Moura Cavalcanti",
    period: "2015 - 2017",
    description:
      "Tecnico em Informatica, com enfase em desenvolvimento de software e sistemas.",
  },
  {
    id: "2",
    degree: "Superior em Analise e Desenvolvimento de Sistemas",
    institution: "UNOPAR",
    period: "Fev/2021 - Mar/2023",
    description:
      "Superior em Analise e Desenvolvimento de Sistemas, com enfase em desenvolvimento de software e sistemas.",
  },
];
