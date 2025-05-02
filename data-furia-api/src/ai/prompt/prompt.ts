export const INITIAL_PROMPT =
  'Analise os seguintes dados de perfil de usuário (interesses declarados, dados de redes sociais, produtos comprados, etc.) fornecidos na plataforma da FURIA e o conteúdo extraído de uma página web (que DEVE ser um perfil em um site de e-sports, como HLTV ou Liquipedia). ' +
  'O objetivo é determinar o quão CONSISTENTE o conteúdo da página web é com a identidade e os interesses deste usuário como fã de e-sports, conforme declarado em seu perfil na plataforma da FURIA.';

export const FINAL_PROMPT =
  'Com base na análise combinada dos dados fornecidos pelo usuário na plataforma da FURIA (interesses declarados, dados de redes sociais, produtos comprados, etc.) e o conteúdo do perfil de e-sports compartilhado, atribua um score de 0 a 10 indicando o nível de consistência e relevância do conteúdo da página para ESTE usuário específico. ' +
  'Um score de 10 significa "altamente consistente e relevante" (provavelmente o perfil do próprio usuário ou de alguém com interesses muito similares), e 0 significa "completamente inconsistente ou irrelevante". ' +
  'Responda APENAS com o número do score (ex: "8").';
