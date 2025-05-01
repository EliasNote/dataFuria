import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Produto } from './Produto';
import { SocialAccount } from '../../social-accounts/entity/SocialAccount';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nome: string;

  @Column()
  endereco: string;

  @Column()
  email: string;

  @Column({ unique: true, nullable: false, length: 11 })
  cpf: string;

  @Column('text')
  interesses: string;

  @Column('text')
  atividades: string;

  @Column('text')
  eventos: string;

  @OneToMany(() => Produto, (produto) => produto.user, { cascade: true })
  produtos: Produto[];

  @OneToMany(() => SocialAccount, (sa) => sa.user, { cascade: true })
  socialAccounts: SocialAccount[];
}
