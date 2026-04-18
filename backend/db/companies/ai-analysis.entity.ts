import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn,
  OneToOne, JoinColumn,
} from 'typeorm';
import { UserCompany } from './user-company.entity';

@Entity('ai_analyses')
export class AiAnalysis {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  user_company_id: string;

  @Column({ type: 'float', nullable: true })
  match_score: number;

  @Column({ type: 'text', nullable: true })
  match_summary: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => UserCompany, (uc) => uc.ai_analysis)
  @JoinColumn({ name: 'user_company_id' })
  user_company: UserCompany;
}
