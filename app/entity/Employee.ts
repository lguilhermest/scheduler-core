import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Company } from "./Company";
import { Service } from "./Service";
import { Scheduling } from "./Scheduling";

@Entity('employees')
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  phone!: string;

  @ManyToOne(() => Company, company => company.employees)
  @JoinColumn({ name: "company_id" })
  company!: Company;

  @ManyToMany(() => Service)
  @JoinTable()
  services!: Service[];

  @OneToMany(() => Scheduling, scheduling => scheduling.employee)
  schedulings?: Scheduling[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;
}