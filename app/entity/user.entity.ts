import { Column } from "typeorm";

enum AccountStatus {
  'ACTIVE' = 'ACTIVE',
  'BLOCKED' = 'BLOCKED',
  'PENDING' = 'PENDING',
}

class User {
  @Column({
    type: 'enum',
    enum: AccountStatus,
    default: AccountStatus.ACTIVE
  })
  status!: AccountStatus;

  @Column()
  name!: string;
}

export default User;