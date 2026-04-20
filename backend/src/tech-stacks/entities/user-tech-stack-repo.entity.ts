import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserTechStack } from './user-tech-stack.entity';
import { Repo } from '../../github/entities/repo.entity';

@Entity('user_tech_stack_repos')
export class UserTechStackRepo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserTechStack)
  @JoinColumn({ name: 'user_tech_stack_id' })
  user_tech_stack: UserTechStack;

  @ManyToOne(() => Repo)
  @JoinColumn({ name: 'repo_id' })
  repo: Repo;
}
