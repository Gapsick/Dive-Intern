import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SelectionProcess } from './selection-process.entity';

@Entity('coding_test_details')
export class CodingTestDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => SelectionProcess)
  @JoinColumn({ name: 'selection_process_id' })
  selection_process: SelectionProcess;

  @Column({ nullable: true })
  platform: string;

  @Column({ type: 'int', nullable: true })
  problem_count: number;

  @Column({ type: 'int', nullable: true })
  duration_minutes: number;

  @Column({ type: 'text', nullable: true })
  problems: string;

  @Column({ nullable: true })
  difficulty: string;
}
