import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { JobPosting } from '../../companies/entities/job-posting.entity';

@Entity('user_companies')
export class UserCompany {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'student_id' })
  user: User;

  @ManyToOne(() => JobPosting)
  @JoinColumn({ name: 'job_posting_id' })
  job_posting: JobPosting;

  @Column({ nullable: true })
  status: string;

  @Column({ default: false })
  is_bookmarked: boolean;

  @Column({ default: false })
  is_applying: boolean;

  @CreateDateColumn()
  saved_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;
}
