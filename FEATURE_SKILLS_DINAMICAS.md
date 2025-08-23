# Feature: Skills Dinâmicas Baseadas no GitHub

## 📋 Descrição

Esta feature implementa um sistema que calcula automaticamente as skills (tecnologias e níveis de proficiência) baseado nos repositórios do GitHub do usuário, substituindo os valores fixos que estavam hardcoded.

## 🔄 Fluxo de Funcionamento

### 1. Requisições à API do GitHub
- **`getRepos()`**: Busca todos os repositórios do usuário
- **`getReposLinguagem(repo)`**: Para cada repositório, busca as linguagens utilizadas e seus respectivos bytes

### 2. Controle de Cache
- **Duração**: Cache de 24 horas (1 dia)
- **Armazenamento**: localStorage do navegador
- **Chaves**: 
  - `github_skills_cache`: Dados das skills
  - `github_skills_cache_time`: Timestamp do cache

### 3. Cálculo das Skills
1. **Agregação**: Soma todos os bytes de cada linguagem em todos os repositórios
2. **Percentual**: Converte bytes em percentuais relativos ao total
3. **Ordenação**: Skills ordenadas por nível decrescente
4. **Arredondamento**: Percentuais arredondados para 2 casas decimais

## 🛠️ Implementação

### Arquivos Modificados

#### `lib/data.ts`
- ✅ Adicionada função `getGitHubSkills()`
- ✅ Interface `Skill` definida
- ✅ Função `getSkills()` para compatibilidade
- ✅ Skills estáticas mantidas como fallback

#### `app/skills/page.tsx`
- ✅ Componente atualizado para usar skills dinâmicas
- ✅ Estado de loading implementado
- ✅ Categorização automática das skills
- ✅ Fallback para skills estáticas em caso de erro

### Estrutura de Dados

```typescript
interface Skill {
  name: string;    // Nome da linguagem/tecnologia
  level: number;   // Percentual (0-100)
}
```

## 📊 Exemplo de Cálculo

**Dados da API:**
```json
{
  "JavaScript": 30000,
  "TypeScript": 20000,
  "HTML": 5000
}
```

**Cálculo:**
- Total: 55.000 bytes
- JavaScript: (30.000 / 55.000) × 100 = 54.54%
- TypeScript: (20.000 / 55.000) × 100 = 36.36%
- HTML: (5.000 / 55.000) × 100 = 9.10%

**Resultado:**
```typescript
[
  { name: "JavaScript", level: 54.54 },
  { name: "TypeScript", level: 36.36 },
  { name: "HTML", level: 9.10 }
]
```

## 🎯 Categorização Automática

As skills são automaticamente categorizadas em:

- **Frontend**: HTML, CSS, JavaScript, TypeScript, React, Next.js
- **Backend**: Node.js, Express, GraphQL, Python, Java, C#
- **Database**: MongoDB, PostgreSQL, MySQL, SQLite, Redis
- **DevOps**: AWS, Docker, Kubernetes, CI/CD, Linux

## 🚀 Como Usar

### No Componente
```typescript
import { getSkills } from '@/lib/data';

const [skills, setSkills] = useState([]);

useEffect(() => {
  const loadSkills = async () => {
    const dynamicSkills = await getSkills();
    setSkills(dynamicSkills);
  };
  loadSkills();
}, []);
```

### Teste da Funcionalidade
```typescript
import { testGitHubSkills } from '@/lib/test-skills';

// No console do navegador
testGitHubSkills();
```

## ⚠️ Considerações

### Performance
- Cache de 24 horas reduz chamadas à API
- Verificação de lado cliente evita erros de SSR
- Fallback para skills estáticas em caso de erro

### Limitações da API GitHub
- Rate limit da API pública
- Dados baseados apenas em bytes de código
- Não considera qualidade ou complexidade do código

### Compatibilidade
- Funciona apenas no lado cliente (browser)
- Requer JavaScript habilitado
- Fallback para dados estáticos se necessário

## 🔧 Manutenção

### Atualizar Cache
Para forçar atualização do cache:
```javascript
localStorage.removeItem('github_skills_cache');
localStorage.removeItem('github_skills_cache_time');
```

### Adicionar Novas Categorias
Editar o array `skillCategories` em `app/skills/page.tsx`:
```typescript
{
  id: "nova-categoria",
  label: "Nova Categoria",
  icon: <IconComponent />,
  skills: getSkillsByCategory(["Skill1", "Skill2"]),
}
```

## 📈 Benefícios

1. **Atualização Automática**: Skills sempre refletem o trabalho atual
2. **Transparência**: Dados baseados em código real
3. **Manutenção Zero**: Não precisa atualizar manualmente
4. **Performance**: Cache inteligente reduz chamadas à API
5. **Confiabilidade**: Fallback para dados estáticos
