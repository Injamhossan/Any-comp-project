
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "@/entities/User";
import { Specialist } from "@/entities/Specialist";
import { Invoice } from "@/entities/Invoice";

export enum OrderStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}

@Entity("orders")
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

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: "userId" })
  user!: User;

  @ManyToOne(() => Specialist, (specialist) => specialist.orders)
  @JoinColumn({ name: "specialistId" })
  specialist!: Specialist;

  @OneToOne(() => Invoice, (invoice) => invoice.order)
  invoice!: Invoice;
}
