import {
  IsString,
  IsOptional,
  ValidateNested,
  IsArray,
  IsEmail,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProdutoDto } from './CreateProdutoDto';

export class CreateUserDto {
  @IsString()
  readonly nome: string;
  @IsString()
  readonly endereco: string;
  @IsEmail()
  readonly email: string;
  @IsString()
  readonly cpf: string;
  @IsString()
  readonly interesses: string;
  @IsString()
  readonly atividades: string;
  @IsString()
  readonly eventos: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProdutoDto)
  readonly produtos?: CreateProdutoDto[];
}
