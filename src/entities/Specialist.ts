
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Media } from "@/entities/Media";
import { ServiceOffering } from "@/entities/ServiceOffering";
import { Order } from "@/entities/Order";

export enum VerificationStatus {
  PENDING = "PENDING",
  VERIFIED = "VERIFIED",
  REJECTED = "REJECTED",
}

@Entity("specialists")
export class Specialist {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0, nullable: true })
  average_rating!: number | null;

  @Column({ default: true })
  is_draft!: boolean;

  @Column({ default: 0 })
  total_number_of_ratings!: number;

  @Column({ default: 0 })
  purchase_count!: number;

  @Column()
  title!: string;

  @Column({ unique: true })
  slug!: string;

  @Column("text")
  description!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  base_price!: number;

  @Column("decimal", { precision: 10, scale: 2 })
  platform_fee!: number;

  @Column("decimal", { precision: 10, scale: 2 })
  final_price!: number;

  @Column({ type: "enum", enum: VerificationStatus, default: VerificationStatus.PENDING })
  verification_status!: VerificationStatus;

  @Column({ default: false })
  is_verified!: boolean;

  @Column({ nullable: true })
  secretary_name!: string;

  @Column({ nullable: true })
  secretary_company!: string;

  @Column({ nullable: true })
  secretary_company_logo!: string;

  @Column({ nullable: true })
  secretary_email!: string;

  @Column({ nullable: true })
  secretary_phone!: string;

  @Column({ type: "text", nullable: true })
  secretary_bio!: string;

  @Column({ nullable: true })
  avatar_url!: string;

  @Column("text", { array: true, default: [] })
  certifications!: string[];

  @Column({ type: "jsonb", nullable: true })
  additional_offerings!: any;

  @Column()
  duration_days!: number;

  @CreateDateColumn({ name: "created_at" })
  created_at!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at!: Date;

  @Column({ type: "timestamp", nullable: true })
  deleted_at!: Date | null;

  @OneToMany(() => Media, (media) => media.specialist)
  media!: Media[];

  @OneToMany(() => ServiceOffering, (service_offering) => service_offering.specialist)
  service_offerings!: ServiceOffering[];

  @OneToMany(() => Order, (order) => order.specialist)
  orders!: Order[];
}
