import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entity/User';

@Entity()
export class SocialAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  provider: string;

  @Column()
  profileId: string;

  @Column()
  accessToken: string;

  @Column({ nullable: true })
  refreshToken: string;

  @ManyToOne(() => User, (user) => user.socialAccounts, { onDelete: 'CASCADE' })
  user: User;
}
