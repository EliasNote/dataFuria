import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { INITIAL_PROMPT, FINAL_PROMPT } from './prompt/prompt';
import { User } from 'src/users/entity/User';

@Injectable()
export class AiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });
  }

  async pesquisar(user: User, socialProfileData: any, websiteText: string) {
    const response = await this.ai.models.generateContent({
      model: process.env.GEMINI_API_MODEL!,
      contents: [
        `${INITIAL_PROMPT}

        Dados do usuário: 
        ${this.getDataUser(user)}
        
        Dados das redes sociais:
        \`\`\`json
        ${JSON.stringify(socialProfileData, null, 2)}
        \`\`\`

        Conteúdo do site: 
        \`\`\`
        ${websiteText.substring(0, 5000)}
        \`\`\`
        
        ${FINAL_PROMPT}`,
      ],
    });

    return response.text!;
  }

  private getDataUser(user: User): string {
    return `Interesses Declarados pelo Usuário:
    - Interesses: ${user.interesses || 'Não informado'}
    - Atividades: ${user.atividades || 'Não informado'}
    - Eventos: ${user.eventos || 'Não informado'}`;
  }
}
