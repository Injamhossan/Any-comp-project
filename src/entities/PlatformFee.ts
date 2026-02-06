
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export enum TierName {
  FREE = "FREE",
  BASIC = "BASIC",
  PREMIUM = "PREMIUM",
  ENTERPRISE = "ENTERPRISE",
}

@Entity("platform_fee")
export class PlatformFee {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "enum", enum: TierName })
  tier_name!: TierName;

  @Column({ type: "int" })
  min_value!: number;

  @Column({ type: "int" })
  max_value!: number;

  @Column("decimal", { precision: 5, scale: 2 })
  platform_fee_percentage!: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
