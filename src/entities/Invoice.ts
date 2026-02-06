
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import type { User } from "./User";
import type { Order } from "./Order";

export enum InvoiceStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  OVERDUE = "OVERDUE",
  CANCELLED = "CANCELLED",
}

@Entity("invoices", { name: "Invoice" })
export class Invoice {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid", nullable: true })
  userId!: string;

  @Column({ type: "uuid", nullable: true, unique: true })
  orderId!: string;

  @Column({ unique: true })
  invoiceNumber!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  amount!: number;

  @Column({ type: "enum", enum: InvoiceStatus, default: InvoiceStatus.PENDING })
  status!: InvoiceStatus;

  @Column({ name: "issued_date", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  issuedDate!: Date;

  @Column({ name: "due_date", type: "timestamp", nullable: true })
  dueDate!: Date | null;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @ManyToOne("User", "invoices")
  @JoinColumn({ name: "userId" })
  user!: User;

  @OneToOne("Order", "invoice")
  @JoinColumn({ name: "orderId" })
  order!: Order;
}
