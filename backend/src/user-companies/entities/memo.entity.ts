import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserCompany } from './user-company.entity';

@Entity('memos')
export class Memo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserCompany)
  @JoinColumn({ name: 'user_company_id' })
  user_company: UserCompany;

  @Column({ nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
