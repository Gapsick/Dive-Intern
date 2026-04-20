import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Interviewer } from './interviewer.entity';

@Entity('interviewer_qna')
export class InterviewerQna {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Interviewer)
  @JoinColumn({ name: 'interviewer_id' })
  interviewer: Interviewer;

  @Column({ type: 'int', nullable: false })
  order_index: number;

  @Column({ nullable: true })
  question: string;

  @Column({ nullable: true })
  answer: string;

  @Column({ nullable: true })
  reverse_question: string;

  @Column({ nullable: true })
  impression: string;
}
