import {
  Entity, PrimaryGeneratedColumn, Column,
  OneToOne, OneToMany, JoinColumn,
} from 'typeorm';
import { SelectionProcess } from './selection-process.entity';
import { SpiSection } from './spi-section.entity';

@Entity('spi_details')
export class SpiDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  selection_process_id: string;

  @Column({ length: 50, nullable: true })
  platform: string;

  @Column({ nullable: true })
  duration_minutes: number;

  @Column({ type: 'text', nullable: true })
  memo: string;

  @OneToOne(() => SelectionProcess, (sp) => sp.spi_detail)
  @JoinColumn({ name: 'selection_process_id' })
  selection_process: SelectionProcess;

  @OneToMany(() => SpiSection, (s) => s.spi_detail)
  spi_sections: SpiSection[];
}
