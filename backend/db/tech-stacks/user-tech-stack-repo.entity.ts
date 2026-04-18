import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, JoinColumn,
} from 'typeorm';
import { UserTechStack } from './user-tech-stack.entity';
import { Repo } from '../github/repo.entity';

@Entity('user_tech_stack_repos')
export class UserTechStackRepo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_tech_stack_id: string;

  @Column()
  repo_id: string;

  @ManyToOne(() => UserTechStack, (uts) => uts.user_tech_stack_repos)
  @JoinColumn({ name: 'user_tech_stack_id' })
  user_tech_stack: UserTechStack;

  @ManyToOne(() => Repo, (r) => r.user_tech_stack_repos)
  @JoinColumn({ name: 'repo_id' })
  repo: Repo;
}
