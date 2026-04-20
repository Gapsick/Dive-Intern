import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SelectionProcess } from './selection-process.entity';

@Entity('spi_details')
export class SpiDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => SelectionProcess)
  @JoinColumn({ name: 'selection_process_id' })
  selection_process: SelectionProcess;

  @Column({ nullable: true })
  platform: string;

  @Column({ type: 'int', nullable: true })
  duration_minutes: number;

  @Column({ nullable: true })
  memo: string;
}
