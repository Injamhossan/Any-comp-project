
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Account } from "./Account";
import { Session } from "./Session";
import { CompanyRegistration } from "./CompanyRegistration";
import { Order } from "./Order";
import { Invoice } from "./Invoice";
import { Notification } from "./Notification";
import { Document } from "./Document";

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

  @OneToMany(() => Account, (account) => account.user)
  accounts!: Account[];

  @OneToMany(() => Session, (session) => session.user)
  sessions!: Session[];

  @OneToMany(() => CompanyRegistration, (registration) => registration.user)
  registrations!: CompanyRegistration[];

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];

  @OneToMany(() => Invoice, (invoice) => invoice.user)
  invoices!: Invoice[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications!: Notification[];

  @OneToMany(() => Document, (document) => document.user)
  documents!: Document[];
}
