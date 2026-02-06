
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import type { User } from "./User";

@Entity("notifications", { name: "Notification" })
export class Notification {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  userId!: string;

  @Column()
  title!: string;

  @Column({ nullable: true })
  message!: string;

  @Column({ default: false })
  isRead!: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @ManyToOne("User", "notifications", { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user!: User;
}
