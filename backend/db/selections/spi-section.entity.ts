import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, JoinColumn,
} from 'typeorm';
import { SpiDetail } from './spi-detail.entity';

@Entity('spi_sections')
export class SpiSection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  spi_detail_id: string;

  @Column({ length: 50 })
  section_type: string;

  @Column({ type: 'text', nullable: true })
  memo: string;

  @ManyToOne(() => SpiDetail, (sd) => sd.spi_sections)
  @JoinColumn({ name: 'spi_detail_id' })
  spi_detail: SpiDetail;
}
