import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Company } from "./company.entity";
import { Service } from "./service.entity";

export enum SchedulingStatus {
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED',
  COMPLETE = 'COMPLETE'
}

@Entity('schedulings')
export class Scheduling {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  amount!: number;

  @Column({ nullable: true })
  notes?: string;

  @Column({ type: 'date' })
  date!: Date;

  @Column({ type: 'time' })
  start!: Date;

  @Column({ type: 'time' })
  end!: Date;

  @Column({ default: SchedulingStatus.PENDING })
  status!: SchedulingStatus;

  @ManyToOne(() => Service, service => service.schedulings)
  @JoinColumn({ name: "service_id" })
  service!: Service;

  @ManyToOne(() => Company, company => company.schedulings)
  @JoinColumn({ name: "company_id" })
  company!: Company;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;
}