import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from './company.entity';

@Entity('company_translations')
export class CompanyTranslation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Company, (company) => company.translations)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column({ nullable: false })
  lang: string;  // 'ja' | 'ko'

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  mvv: string;
}
