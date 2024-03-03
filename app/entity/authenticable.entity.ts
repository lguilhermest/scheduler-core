import * as bcrypt from "bcrypt";
import { Column } from "typeorm";

enum AccountStatus {
  'ACTIVE' = 'ACTIVE',
  'BLOCKED' = 'BLOCKED',
  'PENDING' = 'PENDING',
}

abstract class Authenticable {
  @Column()
  password!: string;

  @Column({
    type: 'enum',
    enum: AccountStatus,
    default: AccountStatus.ACTIVE
  })
  status!: AccountStatus;

  // Methods
  publicProfile(): Partial<Authenticable> {
    const { password, ...data } = this;
    return data;
  }

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