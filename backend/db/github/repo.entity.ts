import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, OneToMany, JoinColumn,
} from 'typeorm';
import { GithubProfile } from './github-profile.entity';
import { UserTechStackRepo } from '../tech-stacks/user-tech-stack-repo.entity';

@Entity('repos')
export class Repo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  github_profile_id: string;

  @Column({ length: 255 })
  repo_name: string;

  @Column({ nullable: true })
  repo_url: string;

  @ManyToOne(() => GithubProfile, (g) => g.repos)
  @JoinColumn({ name: 'github_profile_id' })
  github_profile: GithubProfile;

  @OneToMany(() => UserTechStackRepo, (r) => r.repo)
  user_tech_stack_repos: UserTechStackRepo[];
}
