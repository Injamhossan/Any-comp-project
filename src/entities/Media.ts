
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import type { Specialist } from "./Specialist";

export enum MediaType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  DOCUMENT = "DOCUMENT",
}

export enum MimeType {
  IMAGE_JPEG = "IMAGE_JPEG",
  IMAGE_PNG = "IMAGE_PNG",
  IMAGE_WEBP = "IMAGE_WEBP",
  VIDEO_MP4 = "VIDEO_MP4",
  APPLICATION_PDF = "APPLICATION_PDF",
}

@Entity("media")
export class Media {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  specialist_id!: string;

  @Column()
  file_name!: string;

  @Column()
  file_size!: number;

  @Column({ default: 0 })
  display_order!: number;

  @Column()
  url!: string;

  @Column({ type: "enum", enum: MimeType })
  mime_type!: MimeType;

  @Column({ type: "enum", enum: MediaType })
  media_type!: MediaType;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  uploaded_at!: Date;

  @Column({ type: "timestamp", nullable: true })
  deleted_at!: Date | null;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @ManyToOne("Specialist", "media", { onDelete: "CASCADE" })
  @JoinColumn({ name: "specialist_id" })
  specialist!: Specialist;
}
