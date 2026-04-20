import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('github_profiles')
export class GithubProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'student_id' })
  user: User;

  @Column({ nullable: true })
  github_username: string;

  @Column({ type: 'timestamp', nullable: true })
  analyzed_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
