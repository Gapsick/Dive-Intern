import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SpiDetail } from './spi-detail.entity';

@Entity('spi_sections')
export class SpiSection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => SpiDetail)
  @JoinColumn({ name: 'spi_detail_id' })
  spi_detail: SpiDetail;

  @Column({ nullable: false })
  section_type: string;

  @Column({ nullable: true })
  memo: string;
}
