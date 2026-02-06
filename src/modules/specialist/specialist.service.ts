
import { getDb } from "@/lib/db";
import { Specialist, VerificationStatus } from "@/entities/Specialist";
import { Media, MediaType, MimeType } from "@/entities/Media";
import { IsNull, DeepPartial, In } from "typeorm";

// Helper to construct media create input
const prepareMediaCreate = (urls: string[], specialistId?: string) => {
  return urls.map((url, index) => {
    const media = new Media();
    media.file_name = url.split('/').pop() || `image-${index}`;
    media.file_size = 0;
    media.display_order = index;
    media.url = url;
    media.media_type = MediaType.IMAGE;
    media.mime_type = MimeType.IMAGE_JPEG;
    if (specialistId) media.specialist_id = specialistId;
    return media;
  });
};

export const createSpecialist = async (data: any): Promise<Specialist> => {
  const db = await getDb();
  const { media, service_offerings, ...rest } = data;
  
  const specialist = db.getRepository(Specialist).create(rest as DeepPartial<Specialist>);
  const savedSpecialist = await db.getRepository(Specialist).save(specialist);

  if (media && media.create) {
      const mediaRepo = db.getRepository(Media);
      const mediaToCreate = media.create.map((m: any) => mediaRepo.create({ ...m, specialist_id: savedSpecialist.id }));
      await mediaRepo.save(mediaToCreate);
  }

  // Handle service offerings if they are in the data (simplified for now to match prisma structure if provided)
  if (service_offerings && service_offerings.create) {
      const { ServiceOffering } = await import("@/entities/ServiceOffering");
      const offeringRepo = db.getRepository(ServiceOffering);
      const offeringsToCreate = service_offerings.create.map((so: any) => offeringRepo.create({ ...so, specialist_id: savedSpecialist.id }));
      await offeringRepo.save(offeringsToCreate);
  }

  return savedSpecialist;
};

export const getAllSpecialists = async (includeUnverified = false): Promise<Specialist[]> => {
  const db = await getDb();
  const whereClause: any = { deleted_at: IsNull() };
  
  if (!includeUnverified) {
      // Show both Verified and Pending, but not Rejected or Drafts
      whereClause.is_draft = false;
      whereClause.verification_status = In([VerificationStatus.VERIFIED, VerificationStatus.PENDING]);
  }

  return await db.getRepository(Specialist).find({
    where: whereClause,
    relations: ["media"],
    order: { created_at: 'DESC' }
  });
};

export const getSpecialistById = async (id: string): Promise<Specialist | null> => {
  const db = await getDb();
  return await db.getRepository(Specialist).findOne({
    where: { id },
    relations: ["media", "service_offerings", "service_offerings.master_list_item"],
  });
};

export const getSpecialistBySlug = async (slug: string): Promise<Specialist | null> => {
  const db = await getDb();
  return await db.getRepository(Specialist).findOne({
    where: { slug },
    relations: ["media", "service_offerings", "service_offerings.master_list_item"],
  });
};

export const getSpecialistByOwner = async (email: string, name?: string): Promise<Specialist | null> => {
    const db = await getDb();
    const repo = db.getRepository(Specialist);

   // 1. Search by Email
   if (email) {
       const byEmail = await repo.findOne({
           where: { secretary_email: email, deleted_at: IsNull() },
           relations: ["media", "service_offerings", "service_offerings.master_list_item"]
       });
       if (byEmail) return byEmail;
   }

   // 2. Fallback: Search by Name
   if (name) {
       const byName = await repo.findOne({
           where: { secretary_name: name, deleted_at: IsNull() },
           relations: ["media", "service_offerings", "service_offerings.master_list_item"]
       });
       if (byName) return byName;
   }
   return null;
};


export const updateSpecialist = async (id: string, data: any): Promise<Specialist> => {
  const db = await getDb();
  const repo = db.getRepository(Specialist);
  const { media, service_offerings, ...rest } = data;

  await repo.update(id, rest);

  if (media) {
      const mediaRepo = db.getRepository(Media);
      if (media.deleteMany) await mediaRepo.delete({ specialist_id: id });
      if (media.create) {
          const mediaToCreate = media.create.map((m: any) => mediaRepo.create({ ...m, specialist_id: id }));
          await mediaRepo.save(mediaToCreate);
      }
  }

  if (service_offerings) {
      const { ServiceOffering } = await import("@/entities/ServiceOffering");
      const offeringRepo = db.getRepository(ServiceOffering);
      if (service_offerings.deleteMany) await offeringRepo.delete({ specialist_id: id });
      if (service_offerings.create) {
          const offeringsToCreate = service_offerings.create.map((so: any) => offeringRepo.create({ ...so, specialist_id: id }));
          await offeringRepo.save(offeringsToCreate);
      }
  }

  return (await repo.findOne({ where: { id }, relations: ["media"] }))!;
};

export const deleteSpecialist = async (id: string): Promise<any> => {
  const db = await getDb();
  return await db.getRepository(Specialist).update(id, { deleted_at: new Date() });
};
