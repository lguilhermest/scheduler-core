import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Address } from "./Address";
import { Service } from "./Service";
import { Scheduling } from "./Scheduling";
import { WorkingTime } from "./WorkingTime";
import { Employee } from "./Employee";
import * as bcrypt from "bcrypt";

export enum CompanyStatus {
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED',
  PENDING = 'PENDING',
}

@Entity('companies')
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'enum',
    enum: CompanyStatus,
    default: CompanyStatus.PENDING
  })
  status!: CompanyStatus;

  @Column()
  name!: string;

  @Column({ select: false })
  password!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  phone!: string;

  @OneToMany(() => Address, address => address.company)
  addresses!: Address[];

  @OneToMany(() => Employee, employee => employee.company)
  employees!: Employee[];

  @OneToMany(() => Service, service => service.company)
  services?: Service[];

  @OneToMany(() => Scheduling, scheduling => scheduling.company)
  schedulings?: Scheduling[];

  @OneToMany(() => WorkingTime, workingTime => workingTime.company)
  working_time!: WorkingTime[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;

  // methods
  async setPassword(password: string): Promise<void> {
    this.password = password;
    await this.hashPassword();
  }

  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}