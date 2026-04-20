import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { InterviewDetail } from './interview-detail.entity';

@Entity('interviewers')
export class Interviewer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => InterviewDetail)
  @JoinColumn({ name: 'interview_detail_id' })
  interview_detail: InterviewDetail;

  @Column({ nullable: false })
  role: string;

  @Column({ type: 'int', nullable: false })
  count: number;

  @Column({ nullable: true })
  memo: string;
}
