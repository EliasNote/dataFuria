export const INITIAL_PROMPT =
  'Analise os seguintes dados de perfil de usuário (interesses declarados e dados de redes sociais) e o conteúdo extraído de uma página web (que PODE ser um perfil de e-sports).' +
  'O objetivo é determinar o quão CONSISTENTE o conteúdo da página web é com a identidade e os interesses deste usuário como fã de e-sports.';

export const FINAL_PROMPT =
  'Com base na análise combinada dos interesses declarados, perfil social e conteúdo da página web, atribua um score de 0 a 10 indicando o nível de consistência e relevância do conteúdo da página para ESTE usuário específico.' +
  ' 10 significa "altamente consistente e relevante" (provavelmente o perfil do próprio usuário ou alguém muito similar), e 0 significa "completamente inconsistente ou irrelevante".' +
  ' Responda APENAS com o número do score (ex: "8").';
