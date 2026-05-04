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

  // GitHub API /languages 응답: { TypeScript: 12345, Go: 678 } 형태
  @Column({ type: 'json', nullable: true })
  languages: Record<string, number> | null;

  // Claude Agent가 실제 코드를 읽고 작성한 분석 결과
  @Column({ type: 'text', nullable: true })
  analysis: string | null;
}
