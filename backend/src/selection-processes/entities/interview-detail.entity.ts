import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SelectionProcess } from './selection-process.entity';

@Entity('interview_details')
export class InterviewDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => SelectionProcess)
  @JoinColumn({ name: 'selection_process_id' })
  selection_process: SelectionProcess;

  @Column({ nullable: true })
  interview_type: string;
}
