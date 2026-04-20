import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { UserCompany } from '../../user-companies/entities/user-company.entity';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'student_id' })
  user: User;

  @ManyToOne(() => UserCompany, { nullable: true })
  @JoinColumn({ name: 'user_company_id' })
  user_company: UserCompany;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  schedule_type: string;

  @Column({ type: 'timestamp', nullable: false })
  start_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  end_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
