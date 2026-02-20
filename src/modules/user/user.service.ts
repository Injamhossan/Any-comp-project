import prisma from "@/lib/prisma";

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      registrations: {
        orderBy: { createdAt: 'desc' }
      }
    },
  });

  if (user && user.registrations) {
      if (!user.company_name && user.registrations.length > 0) {
          (user as any).company_name = user.registrations[0].companyName;
          (user as any).company_logo_url = user.registrations[0].companyLogoUrl;
      }
  }

  return user;
};

export const updateUserProfile = async (email: string, data: any) => {
  const user = await prisma.user.findUnique({ where: { email } });
  
  if (!user) throw new Error("User not found");

  const updateData: any = {
      name: data.name,
      phone: data.phone,
      description: data.description,
      company_name: data.company_name,
      company_logo_url: data.company_logo_url,
      certifications: data.certifications,
      image: data.photo_url || data.photoUrl || data.image,
      clients_count: data.clients_count ? parseInt(data.clients_count) : undefined,
      experience_years: data.experience_years ? parseInt(data.experience_years) : undefined,
      firm_description: data.firm_description
  };

  return await prisma.user.update({
    where: { email },
    data: updateData
  });
};
