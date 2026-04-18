import {
  Entity, PrimaryGeneratedColumn, Column,
  OneToOne, JoinColumn,
} from 'typeorm';
import { SelectionProcess } from './selection-process.entity';

@Entity('coding_test_details')
export class CodingTestDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  selection_process_id: string;

  @Column({ length: 100, nullable: true })
  platform: string;

  @Column({ nullable: true })
  problem_count: number;

  @Column({ nullable: true })
  duration_minutes: number;

  @Column({ type: 'text', nullable: true })
  problems: string;

  @Column({ length: 20, nullable: true })
  difficulty: string;

  @OneToOne(() => SelectionProcess, (sp) => sp.coding_test_detail)
  @JoinColumn({ name: 'selection_process_id' })
  selection_process: SelectionProcess;
}
