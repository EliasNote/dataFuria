import { IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProdutoDto {
  @IsString()
  nome: string;

  @IsNumber()
  @Type(() => Number)
  valor: number;

  @IsNumber()
  @Type(() => Number)
  quantidade: number;
}
