import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, OneToMany,
} from 'typeorm';
import { JobPosting } from './job-posting.entity';
import { CompanyTechStack } from './company-tech-stack.entity';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 100, nullable: true })
  industry: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 100, nullable: true })
  region: string;

  @Column({ length: 500, unique: true })
  hp_url: string;

  @Column({ nullable: true })
  logo_url: string;

  @Column({ type: 'text', nullable: true })
  mvv: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => JobPosting, (jp) => jp.company)
  job_postings: JobPosting[];

  @OneToMany(() => CompanyTechStack, (cts) => cts.company)
  company_tech_stacks: CompanyTechStack[];
}
