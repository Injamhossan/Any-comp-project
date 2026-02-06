
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

export enum OrderStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}

@Entity("orders", { name: "Order" })
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid", nullable: true })
  userId!: string;

  @Column({ type: "uuid" })
  specialistId!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  amount!: number;

  @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.PENDING })
  status!: OrderStatus;

  @Column({ nullable: true })
  customerName!: string;

  @Column({ nullable: true })
  customerEmail!: string;

  @Column({ nullable: true })
  customerPhone!: string;

  @Column({ type: "text", nullable: true })
  requirements!: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @ManyToOne("User", "orders")
  @JoinColumn({ name: "userId" })
  user!: any;

  @ManyToOne("Specialist", "orders")
  @JoinColumn({ name: "specialistId" })
  specialist!: any;

  @OneToOne("Invoice", "order")
  invoice!: any;
}
