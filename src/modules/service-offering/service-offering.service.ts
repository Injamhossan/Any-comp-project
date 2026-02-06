
import { getDb } from "@/lib/db";
import { ServiceOfferingMasterList } from "@/entities/ServiceOfferingMasterList";

export const getMasterList = async () => {
  const db = await getDb();
  return await db.getRepository(ServiceOfferingMasterList).find();
};
