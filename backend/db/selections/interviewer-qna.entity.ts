import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, JoinColumn,
} from 'typeorm';
import { Interviewer } from './interviewer.entity';

@Entity('interviewer_qna')
export class InterviewerQna {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  interviewer_id: string;

  @Column({ type: 'text', nullable: true })
  question: string;

  @Column({ type: 'text', nullable: true })
  answer: string;

  @Column({ type: 'text', nullable: true })
  reverse_question: string;

  @Column({ type: 'text', nullable: true })
  reverse_question_answer: string;

  @ManyToOne(() => Interviewer, (i) => i.qnas)
  @JoinColumn({ name: 'interviewer_id' })
  interviewer: Interviewer;
}
