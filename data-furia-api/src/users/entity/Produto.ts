import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nome: string;

  @Column('decimal', { nullable: false })
  valor: number;

  @Column({ nullable: false })
  quantidade: number;

  @ManyToOne(() => User, (user) => user.produtos)
  user: User;
}
