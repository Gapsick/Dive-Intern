import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserCompany } from './user-company.entity';

@Entity('ai_analyses')
export class AiAnalysis {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserCompany)
  @JoinColumn({ name: 'user_company_id' })
  user_company: UserCompany;

  @Column({ type: 'float', nullable: true })
  match_score: number;

  @Column({ type: 'text', nullable: true })
  match_summary: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
