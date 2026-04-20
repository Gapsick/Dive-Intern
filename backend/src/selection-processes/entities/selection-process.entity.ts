import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserCompany } from '../../user-companies/entities/user-company.entity';

@Entity('selection_processes')
export class SelectionProcess {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserCompany)
  @JoinColumn({ name: 'user_company_id' })
  user_company: UserCompany;

  @Column({ nullable: false })
  stage_type: string;

  @Column({ type: 'int', nullable: false })
  stage_order: number;

  @Column({ type: 'date', nullable: true })
  date: Date;

  @Column({ nullable: true })
  result: string;

  @Column({ nullable: true })
  memo: string;

  @Column({ default: false })
  is_shared: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
