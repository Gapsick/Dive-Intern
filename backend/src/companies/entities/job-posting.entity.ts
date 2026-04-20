import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Company } from './company.entity';

@Entity('job_postings')
export class JobPosting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column({ nullable: true })
  position: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  employment_type: string;

  @Column({ nullable: true })
  work_hours: string;

  @Column({ default: false })
  is_remote: boolean;

  @Column({ nullable: true })
  major_requirement: string;

  @Column({ nullable: true })
  other_requirements: string;

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
