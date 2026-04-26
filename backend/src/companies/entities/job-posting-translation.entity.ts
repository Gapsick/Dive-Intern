import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { JobPosting } from './job-posting.entity';

@Entity('job_posting_translations')
export class JobPostingTranslation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => JobPosting, (jobPosting) => jobPosting.translations)
  @JoinColumn({ name: 'job_posting_id' })
  job_posting: JobPosting;

  @Column({ nullable: false })
  lang: string;  // 'ja' | 'ko'

  @Column({ nullable: true })
  position: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  major_requirement: string;

  @Column({ nullable: true })
  other_requirements: string;
}
