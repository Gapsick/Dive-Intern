import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tech_stacks')
export class TechStack {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  category: string;
}
