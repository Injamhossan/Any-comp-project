
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import type { User } from "@/entities/User";

@Entity("sessions")
export class Session {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  sessionToken!: string;

  @Column({ type: "uuid" })
  userId!: string;

  @Column()
  expires!: Date;

  @ManyToOne("User", "sessions", { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user!: User;
}
