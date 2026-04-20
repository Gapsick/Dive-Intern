import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GithubProfile } from './github-profile.entity';

@Entity('repos')
export class Repo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => GithubProfile)
  @JoinColumn({ name: 'github_profile_id' })
  github_profile: GithubProfile;

  @Column({ nullable: false })
  repo_name: string;

  @Column({ nullable: true })
  repo_url: string;
}
