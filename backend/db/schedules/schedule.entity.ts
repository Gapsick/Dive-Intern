import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { UserCompany } from '../companies/user-company.entity';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20 })
  student_id: string;

  @Column({ nullable: true })
  user_company_id: string;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 20, nullable: true })
  schedule_type: string;

  @Column()
  start_at: Date;

  @Column({ nullable: true })
  end_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (u) => u.schedules)
  @JoinColumn({ name: 'student_id', referencedColumnName: 'student_id' })
  user: User;

  @ManyToOne(() => UserCompany, (uc) => uc.schedules, { nullable: true })
  @JoinColumn({ name: 'user_company_id' })
  user_company: UserCompany;
}
