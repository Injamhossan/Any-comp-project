
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("messages")
export class Message {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "sender_name" })
  senderName!: string;

  @Column({ name: "sender_email" })
  senderEmail!: string;

  @Column({ nullable: true })
  subject!: string;

  @Column("text")
  content!: string;

  @Column({ name: "is_read", default: false })
  isRead!: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;
}
