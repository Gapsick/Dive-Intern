import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from './company.entity';
import { TechStack } from '../../tech-stacks/entities/tech-stack.entity';

@Entity('company_tech_stacks')
export class CompanyTechStack {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @ManyToOne(() => TechStack)
  @JoinColumn({ name: 'tech_stack_id' })
  tech_stack: TechStack;
}
