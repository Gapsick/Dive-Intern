import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CompanyTranslation } from './company-translation.entity';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  industry: string;

  @Column({ nullable: true })
  region: string;

  @Column({ unique: true, nullable: false })
  hp_url: string;

  @Column({ nullable: true })
  logo_url: string;

  @OneToMany(() => CompanyTranslation, (translation) => translation.company)
  translations: CompanyTranslation[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
