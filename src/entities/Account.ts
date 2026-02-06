
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity("accounts", { name: "Account" })
export class Account {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  userId!: string;

  @Column()
  type!: string;

  @Column()
  provider!: string;

  @Column()
  providerAccountId!: string;

  @Column({ type: "text", nullable: true })
  refresh_token!: string | null;

  @Column({ type: "text", nullable: true })
  access_token!: string | null;

  @Column({ type: "int", nullable: true })
  expires_at!: number | null;

  @Column({ type: "text", nullable: true })
  token_type!: string | null;

  @Column({ type: "text", nullable: true })
  scope!: string | null;

  @Column({ type: "text", nullable: true })
  id_token!: string | null;

  @Column({ type: "text", nullable: true })
  session_state!: string | null;

  @ManyToOne("User", "accounts", { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user!: any;
}
