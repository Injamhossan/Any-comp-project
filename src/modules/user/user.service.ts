
import { getDb } from "@/lib/db";
import { User } from "@/entities/User";

export const getUserByEmail = async (email: string) => {
  const db = await getDb();
  const user = await db.getRepository(User).findOne({
    where: { email },
    relations: ["registrations"],
  });

  if (user && user.registrations) {
      // Sort registrations by createdAt desc manually if not using query builder
      user.registrations.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      
      if (!user.company_name && user.registrations.length > 0) {
          (user as any).company_name = user.registrations[0].companyName;
          (user as any).company_logo_url = user.registrations[0].companyLogoUrl;
      }
  }

  return user;
};

export const updateUserProfile = async (email: string, data: any) => {
  const db = await getDb();
  const repo = db.getRepository(User);
  const user = await repo.findOne({ where: { email } });
  
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

  await repo.update({ email }, updateData);
  return await repo.findOne({ where: { email } });
};
