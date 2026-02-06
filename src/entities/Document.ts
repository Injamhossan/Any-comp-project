
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

export enum DocumentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  EXPIRED = "EXPIRED",
  REJECTED = "REJECTED",
}

@Entity("documents")
export class Document {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid", nullable: true })
  userId!: string;

  @Column()
  title!: string;

  @Column()
  url!: string;

  @Column({ type: "enum", enum: DocumentStatus, default: DocumentStatus.PENDING })
  status!: DocumentStatus;

  @Column({ name: "sent_date", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  sentDate!: Date;

  @Column({ default: 0 })
  signatoriesCount!: number;

  @Column({ default: 0 })
  signedCount!: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.documents)
  @JoinColumn({ name: "userId" })
  user!: User;
}
