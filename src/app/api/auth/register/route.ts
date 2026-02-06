
import { getDb } from "@/lib/db";
import { User, UserRole } from "@/entities/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Missing email or password" }, { status: 400 });
    }

    const db = await getDb();
    const userRepository = db.getRepository(User);

    const exists = await userRepository.findOne({
      where: { email }
    });

    if (exists) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
      role: UserRole.USER
    });

    await userRepository.save(user);

    return NextResponse.json({ 
        success: true,
        message: "User created successfully",
        user: { id: user.id, email: user.email, name: user.name } 
    }, { status: 201 });

  } catch (error: any) {
    console.error("Registration Error:", error);
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}
