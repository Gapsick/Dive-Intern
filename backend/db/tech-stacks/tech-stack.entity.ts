import {
  Entity, PrimaryGeneratedColumn, Column, OneToMany,
} from 'typeorm';
import { UserTechStack } from './user-tech-stack.entity';
import { CompanyTechStack } from '../companies/company-tech-stack.entity';

@Entity('tech_stacks')
export class TechStack {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 50, nullable: true })
  category: string;

  @OneToMany(() => UserTechStack, (uts) => uts.tech_stack)
  user_tech_stacks: UserTechStack[];

  @OneToMany(() => CompanyTechStack, (cts) => cts.tech_stack)
  company_tech_stacks: CompanyTechStack[];
}
