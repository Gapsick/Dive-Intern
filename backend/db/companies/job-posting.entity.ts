import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn,
  ManyToOne, OneToMany, JoinColumn,
} from 'typeorm';
import { Company } from './company.entity';
import { UserCompany } from './user-company.entity';

@Entity('job_postings')
export class JobPosting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  company_id: string;

  @Column({ length: 100, nullable: true })
  position: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 50, nullable: true })
  employment_type: string;

  @Column({ length: 100, nullable: true })
  work_hours: string;

  @Column({ default: false })
  is_remote: boolean;

  @Column({ length: 255, nullable: true })
  major_requirement: string;

  @Column({ type: 'text', nullable: true })
  other_requirements: string;

  @Column({ nullable: true })
  salary_min: number;

  @Column({ nullable: true })
  salary_max: number;

  @Column({ nullable: true })
  recruit_url: string;

  @Column({ length: 50, nullable: true })
  term: string;

  @Column({ type: 'date', nullable: true })
  start_date: string;

  @Column({ type: 'date', nullable: true })
  end_date: string;

  @Column({ type: 'date', nullable: true })
  deadline: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Company, (c) => c.job_postings)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @OneToMany(() => UserCompany, (uc) => uc.job_posting)
  user_companies: UserCompany[];
}
