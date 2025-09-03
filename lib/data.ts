import { Project } from "@/components/project-card";
import axios from "axios";

// Funções auxiliares para gerenciar cookies
const setCookie = (name: string, value: string, hours: number = 24) => {
  if (typeof document === 'undefined') return;
  
  const date = new Date();
  date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const deleteCookie = (name: string) => {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

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

    // Verificar cache nos cookies
    const cache = getCookie("github_skills_cache");
    
    if (cache) {
      try {
        return JSON.parse(decodeURIComponent(cache));
      } catch (error) {
        // Se houver erro ao fazer parse, deletar o cookie inválido
        deleteCookie("github_skills_cache");
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

    // Salvar no cookie com expiração de 24 horas
    if (typeof window !== 'undefined') {
      setCookie("github_skills_cache", encodeURIComponent(JSON.stringify(skills)), 24);
    }

    return skills;
  } catch (error: any) {
    console.error("Erro ao calcular skills do GitHub:", error);
    
    // Verificar se é erro de rate limit
    if (error?.response?.status === 403 && error?.response?.data?.message?.includes('rate limit')) {
      console.warn("Rate limit da API do GitHub excedido. Usando skills padrão.");
    }
    
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

    // Verificar cache nos cookies
    const cache = getCookie("github_projects_cache");
    
    if (cache) {
      try {
        return JSON.parse(decodeURIComponent(cache));
      } catch (error) {
        // Se houver erro ao fazer parse, deletar o cookie inválido
        deleteCookie("github_projects_cache");
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

    // Salvar no cookie com expiração de 24 horas
    if (typeof window !== 'undefined') {
      setCookie("github_projects_cache", encodeURIComponent(JSON.stringify(githubProjects)), 24);
    }

    return githubProjects;
  } catch (error: any) {
    console.error("Erro ao buscar repositórios:", error);
    
    // Verificar se é erro de rate limit
    if (error?.response?.status === 403 && error?.response?.data?.message?.includes('rate limit')) {
      console.warn("Rate limit da API do GitHub excedido. Tente novamente mais tarde.");
    }
    
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
    title: "Desenvolvedor Web",
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
