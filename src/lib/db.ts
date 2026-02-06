
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "@/entities/User";
import { Account } from "@/entities/Account";
import { Session } from "@/entities/Session";
import { Specialist } from "@/entities/Specialist";
import { Media } from "@/entities/Media";
import { CompanyRegistration } from "@/entities/CompanyRegistration";
import { Order } from "@/entities/Order";
import { Invoice } from "@/entities/Invoice";
import { Message } from "@/entities/Message";
import { Notification } from "@/entities/Notification";
import { Document } from "@/entities/Document";
import { PlatformFee } from "@/entities/PlatformFee";
import { ServiceOffering } from "@/entities/ServiceOffering";
import { ServiceOfferingMasterList } from "@/entities/ServiceOfferingMasterList";
import { VerificationToken } from "@/entities/VerificationToken";
import { FileEntity } from "@/entities/File";

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,  
    logging: process.env.NODE_ENV === "development",
    entities: [
        User,
        Account,
        Session,
        Specialist,
        Media,
        CompanyRegistration,
        Order,
        Invoice,
        Message,
        Notification,
        Document,
        PlatformFee,
        ServiceOffering,
        ServiceOfferingMasterList,
        VerificationToken,
        FileEntity
    ],
    migrations: [],
    subscribers: [],
});

let initialized = false;

export const getDb = async () => {
    if (!initialized) {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        initialized = true;
    }
    return AppDataSource;
};

export default AppDataSource;
