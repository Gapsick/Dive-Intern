import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, OneToMany, JoinColumn,
} from 'typeorm';
import { GithubProfile } from '../github/github-profile.entity';
import { TechStack } from './tech-stack.entity';
import { UserTechStackRepo } from './user-tech-stack-repo.entity';

@Entity('user_tech_stacks')
export class UserTechStack {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  github_profile_id: string;

  @Column()
  tech_stack_id: string;

  @Column({ type: 'tinyint', nullable: true })
  level: number;

  @Column({ type: 'text', nullable: true })
  level_reason: string;

  @Column({ nullable: true })
  analyzed_at: Date;

  @ManyToOne(() => GithubProfile, (g) => g.user_tech_stacks)
  @JoinColumn({ name: 'github_profile_id' })
  github_profile: GithubProfile;

  @ManyToOne(() => TechStack, (ts) => ts.user_tech_stacks)
  @JoinColumn({ name: 'tech_stack_id' })
  tech_stack: TechStack;

  @OneToMany(() => UserTechStackRepo, (r) => r.user_tech_stack)
  user_tech_stack_repos: UserTechStackRepo[];
}
