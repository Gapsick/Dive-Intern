import {
  Entity, PrimaryGeneratedColumn, Column,
  UpdateDateColumn, ManyToOne, OneToOne, OneToMany, JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { JobPosting } from './job-posting.entity';
import { AiAnalysis } from './ai-analysis.entity';
import { Memo } from '../memos/memo.entity';
import { Schedule } from '../schedules/schedule.entity';
import { SelectionProcess } from '../selections/selection-process.entity';

@Entity('user_companies')
export class UserCompany {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20 })
  student_id: string;

  @Column()
  job_posting_id: string;

  @Column({ length: 20, nullable: true })
  status: string;

  @Column({ default: false })
  is_bookmarked: boolean;

  @Column({ default: false })
  is_applying: boolean;

  @Column({ nullable: true })
  saved_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (u) => u.user_companies)
  @JoinColumn({ name: 'student_id', referencedColumnName: 'student_id' })
  user: User;

  @ManyToOne(() => JobPosting, (jp) => jp.user_companies)
  @JoinColumn({ name: 'job_posting_id' })
  job_posting: JobPosting;

  @OneToOne(() => AiAnalysis, (ai) => ai.user_company)
  ai_analysis: AiAnalysis;

  @OneToMany(() => Memo, (m) => m.user_company)
  memos: Memo[];

  @OneToMany(() => Schedule, (s) => s.user_company)
  schedules: Schedule[];

  @OneToMany(() => SelectionProcess, (sp) => sp.user_company)
  selection_processes: SelectionProcess[];
}
