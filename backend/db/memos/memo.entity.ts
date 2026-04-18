import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn,
  ManyToOne, JoinColumn,
} from 'typeorm';
import { UserCompany } from '../companies/user-company.entity';

@Entity('memos')
export class Memo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_company_id: string;

  @Column({ length: 255, nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => UserCompany, (uc) => uc.memos)
  @JoinColumn({ name: 'user_company_id' })
  user_company: UserCompany;
}
