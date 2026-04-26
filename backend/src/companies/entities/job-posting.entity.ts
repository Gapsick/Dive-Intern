import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Company } from './company.entity';
import { JobPostingTranslation } from './job-posting-translation.entity';

@Entity('job_postings')
export class JobPosting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column({ nullable: true })
  employment_type: string;

  @Column({ nullable: true })
  work_hours: string;

  @Column({ default: false })
  is_remote: boolean;

  @Column({ type: 'int', nullable: true })
  salary_min: number;

  @Column({ type: 'int', nullable: true })
  salary_max: number;

  @Column({ nullable: true })
  recruit_url: string;

  @Column({ nullable: true })
  term: string;

  @Column({ type: 'date', nullable: true })
  start_date: Date;

  @Column({ type: 'date', nullable: true })
  end_date: Date;

  @Column({ type: 'date', nullable: true })
  application_deadline: Date;

  @OneToMany(() => JobPostingTranslation, (translation) => translation.job_posting)
  translations: JobPostingTranslation[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
