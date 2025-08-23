// Arquivo de teste para verificar a funcionalidade das skills dinâmicas
import { getGitHubSkills } from './data';

// Função de teste
export const testGitHubSkills = async () => {
  try {
    console.log('🔄 Iniciando teste das skills dinâmicas...');
    
    const skills = await getGitHubSkills();
    
    console.log('✅ Skills carregadas com sucesso!');
    console.log('📊 Total de skills:', skills.length);
    console.log('📋 Skills encontradas:', skills);
    
    // Verificar se as skills têm a estrutura correta
    const isValidStructure = skills.every(skill => 
      typeof skill.name === 'string' && 
      typeof skill.level === 'number' && 
      skill.level >= 0 && 
      skill.level <= 100
    );
    
    if (isValidStructure) {
      console.log('✅ Estrutura das skills está correta');
    } else {
      console.log('❌ Estrutura das skills está incorreta');
    }
    
    // Verificar se os percentuais somam aproximadamente 100%
    const totalPercentage = skills.reduce((sum, skill) => sum + skill.level, 0);
    const isPercentageValid = Math.abs(totalPercentage - 100) < 1; // Tolerância de 1%
    
    if (isPercentageValid) {
      console.log('✅ Percentuais somam aproximadamente 100%:', totalPercentage.toFixed(2) + '%');
    } else {
      console.log('⚠️ Percentuais não somam 100%:', totalPercentage.toFixed(2) + '%');
    }
    
    return skills;
  } catch (error) {
    console.error('❌ Erro ao testar skills:', error);
    throw error;
  }
};

// Executar teste se este arquivo for executado diretamente
if (typeof window !== 'undefined') {
  // Apenas no lado do cliente
  testGitHubSkills().catch(console.error);
}
