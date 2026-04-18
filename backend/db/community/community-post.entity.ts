import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { SelectionProcess } from '../selections/selection-process.entity';

@Entity('community_posts')
export class CommunityPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20 })
  student_id: string;

  @Column({ nullable: true })
  selection_process_id: string;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (u) => u.community_posts)
  @JoinColumn({ name: 'student_id', referencedColumnName: 'student_id' })
  user: User;

  @ManyToOne(() => SelectionProcess, (sp) => sp.community_posts, { nullable: true })
  @JoinColumn({ name: 'selection_process_id' })
  selection_process: SelectionProcess;
}
