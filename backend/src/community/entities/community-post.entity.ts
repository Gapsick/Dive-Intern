import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { SelectionProcess } from '../../selection-processes/entities/selection-process.entity';

@Entity('community_posts')
export class CommunityPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'student_id' })
  user: User;

  @ManyToOne(() => SelectionProcess, { nullable: true })
  @JoinColumn({ name: 'selection_process_id' })
  selection_process: SelectionProcess;

  @Column({ nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @CreateDateColumn()
  created_at: Date;
}
