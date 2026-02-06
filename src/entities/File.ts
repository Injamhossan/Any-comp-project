
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("files")
export class FileEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  filename!: string;

  @Column()
  mimeType!: string;

  @Column("bytea")
  data!: Buffer;

  @Column("bigint")
  size!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
