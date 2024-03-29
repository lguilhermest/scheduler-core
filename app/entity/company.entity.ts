import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import Authenticable from "./authenticable.entity";
import Address from "./address.entity";
import Service from "./service.entity";
import { Scheduling } from "./scheduling.entity";

@Entity('companies')
class Company extends Authenticable {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  phone!: string;

  @OneToMany(() => Address, address => address.company)
  addresses!: Address[];

  @OneToMany(() => Service, service => service.company)
  services?: Service[];

  @OneToMany(() => Scheduling, scheduling => scheduling.company)
  schedulings?: Scheduling[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;
}

export default Company;