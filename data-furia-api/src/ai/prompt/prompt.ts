export const INITIAL_PROMPT =
  'Analise os seguintes dados de perfil de usuário (interesses declarados e dados de redes sociais) e o conteúdo extraído de uma página web (que PODE ser um perfil de e-sports).' +
  'O objetivo é determinar se o conteúdo da página web é CONSISTENTE com a identidade e os interesses deste usuário como fã de e-sports.';

export const FINAL_PROMPT =
  'Com base na análise combinada dos interesses declarados, perfil social e conteúdo da página web, o conteúdo desta página parece ser consistente e relevante para ESTE usuário específico (por exemplo, poderia ser o perfil dele ou de alguém com interesses muito similares)?' +
  'Responda APENAS com "CONSISTENTE" ou "INCONSISTENTE".';
