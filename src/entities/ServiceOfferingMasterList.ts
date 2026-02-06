
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { ServiceOffering } from "@/entities/ServiceOffering";

@Entity("service_offerings_master_list")
export class ServiceOfferingMasterList {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column("text")
  description!: string;

  @Column({ nullable: true })
  s3_key!: string;

  @Column()
  bucket_name!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => ServiceOffering, (offering) => offering.master_list_item)
  service_offerings!: ServiceOffering[];
}
