
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import type { User } from "./User";

export enum RegistrationStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  ACTION_REQUIRED = "ACTION_REQUIRED",
}

@Entity("company_registrations", { name: "CompanyRegistration" })
export class CompanyRegistration {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid", unique: true })
  userId!: string;

  @Column({ name: "company_name" })
  companyName!: string;

  @Column({ name: "company_type", nullable: true })
  companyType!: string;

  @Column({ name: "company_logo_url", nullable: true })
  companyLogoUrl!: string;

  @Column({ type: "enum", enum: RegistrationStatus, default: RegistrationStatus.PENDING })
  status!: RegistrationStatus;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @ManyToOne("User", "registrations")
  @JoinColumn({ name: "userId" })
  user!: User;
}
