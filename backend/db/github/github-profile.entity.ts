import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, OneToOne, OneToMany, JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Repo } from './repo.entity';
import { UserTechStack } from '../tech-stacks/user-tech-stack.entity';

@Entity('github_profiles')
export class GithubProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20, unique: true })
  student_id: string;

  @Column({ length: 100, nullable: true })
  github_username: string;

  @Column({ nullable: true })
  analyzed_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @OneToOne(() => User, (u) => u.github_profile)
  @JoinColumn({ name: 'student_id', referencedColumnName: 'student_id' })
  user: User;

  @OneToMany(() => Repo, (r) => r.github_profile)
  repos: Repo[];

  @OneToMany(() => UserTechStack, (uts) => uts.github_profile)
  user_tech_stacks: UserTechStack[];
}
