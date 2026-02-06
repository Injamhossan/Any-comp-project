
import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("verification_tokens", { name: "VerificationToken" })
export class VerificationToken {
  @PrimaryColumn()
  identifier!: string;

  @PrimaryColumn()
  token!: string;

  @Column()
  expires!: Date;
}
