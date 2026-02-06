
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { FileEntity } from "@/entities/File";

export const uploadFile = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: "No file received or file is a string." }, { status: 400 });
    }

    const fileObject = file as File;
    const arrayBuffer = await fileObject.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Sanitize filename
    const sanitizedFilename = fileObject.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9.\-_]/g, '');
    const filename = `${Date.now()}_${sanitizedFilename}`;

    const db = await getDb();
    const fileRepo = db.getRepository(FileEntity);

    // Store in DB
    const savedFile = fileRepo.create({
        filename: filename,
        mimeType: fileObject.type,
        data: buffer,
        size: fileObject.size
    });
    
    await fileRepo.save(savedFile);
    
    // The public URL for the file to be served via API
    const downloadURL = `/api/files/${savedFile.id}`;

    return NextResponse.json({ 
        success: true, 
        url: downloadURL,
        filename: filename,
        mimeType: fileObject.type,
        size: fileObject.size,
        id: savedFile.id
    });
  } catch (error: any) {
    console.error("DB Upload Error:", error);
    return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 });
  }
};
