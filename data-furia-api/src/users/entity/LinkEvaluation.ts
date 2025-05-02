import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User';

@Entity()
export class LinkEvaluation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column('int')
  score: number;

  @ManyToOne(() => User, (user) => user.linkEvaluations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;
}
