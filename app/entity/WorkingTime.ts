import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity
} from 'typeorm';
import { Company } from './Company';

@Entity()
export class WorkingTime extends BaseEntity {
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
