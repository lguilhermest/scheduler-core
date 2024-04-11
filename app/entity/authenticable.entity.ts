import * as bcrypt from "bcrypt";
import { BaseEntity, Column } from "typeorm";

export enum AccountStatus {
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED',
  PENDING = 'PENDING',
}

abstract class Authenticable extends BaseEntity {
  @Column({ select: false })
  password!: string;

  @Column({
    type: 'enum',
    enum: AccountStatus,
    default: AccountStatus.PENDING
  })
  status!: AccountStatus;

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

export default Authenticable;