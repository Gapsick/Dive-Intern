import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn,
  ManyToOne, OneToOne, OneToMany, JoinColumn,
} from 'typeorm';
import { UserCompany } from '../companies/user-company.entity';
import { InterviewDetail } from './interview-detail.entity';
import { CodingTestDetail } from './coding-test-detail.entity';
import { SpiDetail } from './spi-detail.entity';
import { CommunityPost } from '../community/community-post.entity';

@Entity('selection_processes')
export class SelectionProcess {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_company_id: string;

  @Column({ length: 20 })
  stage_type: string;

  @Column()
  stage_order: number;

  @Column({ type: 'date', nullable: true })
  date: string;

  @Column({ length: 20, nullable: true })
  result: string;

  @Column({ type: 'text', nullable: true })
  memo: string;

  @Column({ default: false })
  is_shared: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => UserCompany, (uc) => uc.selection_processes)
  @JoinColumn({ name: 'user_company_id' })
  user_company: UserCompany;

  @OneToOne(() => InterviewDetail, (i) => i.selection_process)
  interview_detail: InterviewDetail;

  @OneToOne(() => CodingTestDetail, (c) => c.selection_process)
  coding_test_detail: CodingTestDetail;

  @OneToOne(() => SpiDetail, (s) => s.selection_process)
  spi_detail: SpiDetail;

  @OneToMany(() => CommunityPost, (cp) => cp.selection_process)
  community_posts: CommunityPost[];
}
