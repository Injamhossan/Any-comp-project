
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import type { Account } from "./Account";
import type { Session } from "./Session";
import type { CompanyRegistration } from "./CompanyRegistration";
import type { Order } from "./Order";
import type { Invoice } from "./Invoice";
import type { Notification } from "./Notification";
import type { Document } from "./Document";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  SPECIALIST = "SPECIALIST",
}

@Entity("users", { name: "User" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text", nullable: true })
  name!: string | null;

  @Column({ type: "text", unique: true, nullable: true })
  email!: string | null;

  @Column({ name: "email_verified", type: "timestamp", nullable: true })
  emailVerified!: Date | null;

  @Column({ name: "photo_url", type: "text", nullable: true })
  image!: string | null;

  @Column({ type: "text", nullable: true })
  password!: string | null;

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role!: UserRole;

  @Column({ type: "text", nullable: true })
  description!: string | null;

  @Column({ type: "text", nullable: true })
  phone!: string | null;

  @Column({ type: "text", nullable: true })
  company_name!: string | null;

  @Column({ type: "text", nullable: true })
  company_logo_url!: string | null;

  @Column("text", { array: true, default: [] })
  certifications!: string[];

  @Column({ type: "int", default: 0 })
  clients_count!: number;

  @Column({ type: "int", default: 0 })
  experience_years!: number;

  @Column({ type: "text", nullable: true })
  firm_description!: string | null;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @OneToMany("Account", "user")
  accounts!: Account[];

  @OneToMany("Session", "user")
  sessions!: Session[];

  @OneToMany("CompanyRegistration", "user")
  registrations!: CompanyRegistration[];

  @OneToMany("Order", "user")
  orders!: Order[];

  @OneToMany("Invoice", "user")
  invoices!: Invoice[];

  @OneToMany("Notification", "user")
  notifications!: Notification[];

  @OneToMany("Document", "user")
  documents!: Document[];
}
