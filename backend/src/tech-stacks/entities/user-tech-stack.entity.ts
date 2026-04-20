import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GithubProfile } from '../../github/entities/github-profile.entity';
import { TechStack } from './tech-stack.entity';

@Entity('user_tech_stacks')
export class UserTechStack {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => GithubProfile)
  @JoinColumn({ name: 'github_profile_id' })
  github_profile: GithubProfile;

  @ManyToOne(() => TechStack)
  @JoinColumn({ name: 'tech_stack_id' })
  tech_stack: TechStack;

  @Column({ type: 'int', nullable: true })
  level: number;

  @Column({ nullable: true })
  level_reason: string;

  @Column({ type: 'timestamp', nullable: true })
  analyzed_at: Date;
}
