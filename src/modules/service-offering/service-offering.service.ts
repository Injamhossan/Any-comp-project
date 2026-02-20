import prisma from "@/lib/prisma";

export const getMasterList = async () => {
  return await prisma.serviceOfferingMasterList.findMany();
};
