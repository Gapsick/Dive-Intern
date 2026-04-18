import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('oauth_accounts')
export class OauthAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20 })
  student_id: string;

  @Column({ length: 20 })
  provider: string;

  @Column({ length: 255 })
  provider_account_id: string;

  @Column({ type: 'text', nullable: true })
  refresh_token: string;

  @Column({ nullable: true })
  token_expires_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (u) => u.oauth_accounts)
  @JoinColumn({ name: 'student_id', referencedColumnName: 'student_id' })
  user: User;
}
