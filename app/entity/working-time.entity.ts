import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Company } from './company.entity';

@Entity()
export class WorkingTime {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  week_day!: number;

  @Column()
  start!: string;

  @Column()
  end!: string;

  @ManyToOne(() => Company, company => company.working_time)
  @JoinColumn({ name: "company_id" })
  company!: Company;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;
}
