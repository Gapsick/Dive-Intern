import {
  Entity, PrimaryColumn, Column,
  CreateDateColumn, UpdateDateColumn,
  OneToMany, OneToOne,
} from 'typeorm';
import { OauthAccount } from '../auth/oauth-account.entity';
import { GithubProfile } from '../github/github-profile.entity';
import { UserCompany } from '../companies/user-company.entity';
import { Schedule } from '../schedules/schedule.entity';
import { CommunityPost } from '../community/community-post.entity';

@Entity('users')
export class User {
  @PrimaryColumn({ length: 20 })
  student_id: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 100 })
  name: string;

  @Column({ nullable: true })
  portfolio_url: string;

  @Column({ nullable: true })
  desired_position: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => OauthAccount, (o) => o.user)
  oauth_accounts: OauthAccount[];

  @OneToOne(() => GithubProfile, (g) => g.user)
  github_profile: GithubProfile;

  @OneToMany(() => UserCompany, (uc) => uc.user)
  user_companies: UserCompany[];

  @OneToMany(() => Schedule, (s) => s.user)
  schedules: Schedule[];

  @OneToMany(() => CommunityPost, (p) => p.user)
  community_posts: CommunityPost[];
}
