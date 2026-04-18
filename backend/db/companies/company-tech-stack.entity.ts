import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, JoinColumn,
} from 'typeorm';
import { Company } from './company.entity';
import { TechStack } from '../tech-stacks/tech-stack.entity';

@Entity('company_tech_stacks')
export class CompanyTechStack {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  company_id: string;

  @Column()
  tech_stack_id: string;

  @ManyToOne(() => Company, (c) => c.company_tech_stacks)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @ManyToOne(() => TechStack, (ts) => ts.company_tech_stacks)
  @JoinColumn({ name: 'tech_stack_id' })
  tech_stack: TechStack;
}
