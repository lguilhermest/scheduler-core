import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Company } from "./Company";
import { Scheduling } from "./Scheduling";

export enum ServiceStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

@Entity('services')
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description!: string;

  @Column()
  duration_minutes!: number;

  @Column()
  price!: number;

  @Column()
  status!: ServiceStatus;

  @ManyToOne(() => Company, company => company.services)
  @JoinColumn({ name: "company_id" })
  company!: Company;

  @OneToMany(() => Scheduling, scheduling => scheduling.service)
  schedulings!: Scheduling[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;
}