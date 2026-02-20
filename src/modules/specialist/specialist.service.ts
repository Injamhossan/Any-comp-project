import prisma from "@/lib/prisma";

export const createSpecialist = async (data: any): Promise<any> => {
  const { media, service_offerings, ...rest } = data;
  
  return await prisma.specialist.create({
    data: {
      ...rest,
      media: media?.create ? {
        create: media.create
      } : undefined,
      service_offerings: service_offerings?.create ? {
        create: service_offerings.create
      } : undefined
    },
    include: {
      media: true,
      service_offerings: true
    }
  });
};

export const getAllSpecialists = async (includeUnverified = false): Promise<any[]> => {
  const whereClause: any = { deleted_at: null };
  
  if (!includeUnverified) {
      whereClause.is_draft = false;
      whereClause.verification_status = {
          in: ['VERIFIED', 'PENDING']
      };
  }

  return await prisma.specialist.findMany({
    where: whereClause,
    include: {
      media: true
    },
    orderBy: { created_at: 'desc' }
  });
};

export const getSpecialistById = async (id: string): Promise<any | null> => {
  return await prisma.specialist.findUnique({
    where: { id },
    include: {
      media: true,
      service_offerings: {
        include: {
          master_list_item: true
        }
      }
    },
  });
};

export const getSpecialistBySlug = async (slug: string): Promise<any | null> => {
  return await prisma.specialist.findUnique({
    where: { slug },
    include: {
      media: true,
      service_offerings: {
        include: {
          master_list_item: true
        }
      }
    },
  });
};

export const getSpecialistByOwner = async (email: string, name?: string): Promise<any | null> => {
   // 1. Search by Email
   if (email) {
       const byEmail = await prisma.specialist.findFirst({
           where: { secretary_email: email, deleted_at: null },
           include: {
             media: true,
             service_offerings: {
               include: {
                 master_list_item: true
               }
             }
           }
       });
       if (byEmail) return byEmail;
   }

   // 2. Fallback: Search by Name
   if (name) {
       const byName = await prisma.specialist.findFirst({
           where: { secretary_name: name, deleted_at: null },
           include: {
             media: true,
             service_offerings: {
               include: {
                 master_list_item: true
               }
             }
           }
       });
       if (byName) return byName;
   }
   return null;
};


export const updateSpecialist = async (id: string, data: any): Promise<any> => {
  const { media, service_offerings, ...rest } = data;

  const updateData: any = { ...rest };

  if (media) {
      updateData.media = {};
      if (media.deleteMany) updateData.media.deleteMany = media.deleteMany;
      if (media.create) updateData.media.create = media.create;
  }

  if (service_offerings) {
      updateData.service_offerings = {};
      if (service_offerings.deleteMany) updateData.service_offerings.deleteMany = service_offerings.deleteMany;
      if (service_offerings.create) updateData.service_offerings.create = service_offerings.create;
  }

  return await prisma.specialist.update({
    where: { id },
    data: updateData,
    include: {
      media: true
    }
  });
};

export const deleteSpecialist = async (id: string): Promise<any> => {
  return await prisma.specialist.update({
    where: { id },
    data: { deleted_at: new Date() }
  });
};
