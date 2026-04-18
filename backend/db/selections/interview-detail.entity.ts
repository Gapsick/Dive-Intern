import {
  Entity, PrimaryGeneratedColumn, Column,
  OneToOne, OneToMany, JoinColumn,
} from 'typeorm';
import { SelectionProcess } from './selection-process.entity';
import { Interviewer } from './interviewer.entity';

@Entity('interview_details')
export class InterviewDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  selection_process_id: string;

  @Column({ length: 20, nullable: true })
  interview_type: string;

  @OneToOne(() => SelectionProcess, (sp) => sp.interview_detail)
  @JoinColumn({ name: 'selection_process_id' })
  selection_process: SelectionProcess;

  @OneToMany(() => Interviewer, (i) => i.interview_detail)
  interviewers: Interviewer[];
}
