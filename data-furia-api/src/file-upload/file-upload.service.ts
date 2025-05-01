import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class FileUploadService {
  constructor(private readonly usersService: UsersService) {}

  async verifyFile(cpf: string, file: Express.Multer.File): Promise<boolean> {
    if (!cpf) {
      throw new BadRequestException('cpf é obrigatório');
    }
    const user = await this.usersService.findUserByCpf(cpf);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return true;
  }
}
