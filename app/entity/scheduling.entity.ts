import {
  BaseEntity,
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
  /* O agendamento foi criado, mas ainda não foi confirmado pelo cliente ou processado pelo sistema. */
  PENDING = "PENDING",
  /* O agendamento foi confirmado pelo cliente ou pelo sistema e está aguardando para ser realizado. */
  CONFIRMED = "CONFIRMED",
  /* O agendamento foi cancelado pelo cliente ou pelo sistema antes do horário agendado. */
  CANCELLED = "CANCELLED",
  /* O agendamento foi realizado com sucesso e concluído. */
  COMPLETED = "COMPLETED",
  /* O agendamento expirou, ou seja, o horário agendado passou e o agendamento não foi confirmado ou realizado. */
  EXPIRED = "EXPIRED",
  /* O agendamento foi rejeitado por algum motivo específico. */
  REJECTED = "REJECTED",
  /* O agendamento foi reprogramado para um novo horário. */
  RESCHEDULED = "RESCHEDULED",
  /* O agendamento está atualmente em andamento */
  IN_PROGRESS = "IN_PROGRESS ",
}

@Entity('schedulings')
export class Scheduling extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

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