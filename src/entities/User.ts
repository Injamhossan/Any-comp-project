
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  SPECIALIST = "SPECIALIST",
}

@Entity("users")
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
  accounts!: any[];

  @OneToMany("Session", "user")
  sessions!: any[];

  @OneToMany("CompanyRegistration", "user")
  registrations!: any[];

  @OneToMany("Order", "user")
  orders!: any[];

  @OneToMany("Invoice", "user")
  invoices!: any[];

  @OneToMany("Notification", "user")
  notifications!: any[];

  @OneToMany("Document", "user")
  documents!: any[];
}
