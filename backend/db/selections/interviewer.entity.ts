import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, OneToMany, JoinColumn,
} from 'typeorm';
import { InterviewDetail } from './interview-detail.entity';
import { InterviewerQna } from './interviewer-qna.entity';

@Entity('interviewers')
export class Interviewer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  interview_detail_id: string;

  @Column({ length: 50 })
  role: string;

  @Column()
  count: number;

  @Column({ type: 'text', nullable: true })
  memo: string;

  @ManyToOne(() => InterviewDetail, (id) => id.interviewers)
  @JoinColumn({ name: 'interview_detail_id' })
  interview_detail: InterviewDetail;

  @OneToMany(() => InterviewerQna, (q) => q.interviewer)
  qnas: InterviewerQna[];
}
