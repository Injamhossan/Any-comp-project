
import { TypeORMAdapter } from "@auth/typeorm-adapter"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { getDb } from "@/lib/db"
import { User } from "@/entities/User"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  // TypeORMAdapter can take the DataSource configuration directly or a DataSource instance
  // Since getDb is async, we might need a workaround if adapter doesn't support async initialization easily in this version
  // Actually, TypeORMAdapter usually takes the DB connection options.
  adapter: TypeORMAdapter({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: false,
  }),
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const db = await getDb();
        const userRepository = db.getRepository(User);

        const user = await userRepository.findOne({
          where: {
            email: credentials.email
          }
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) {
            throw new Error("Invalid credentials");
        }

        return user as any;
      }
    })
  ],
  callbacks: {
    async session({ token, session }) {
        if (token && session.user) {
            session.user.id = token.id as string;
            session.user.role = token.role as string;
            session.user.image = token.picture;
            session.user.name = token.name;
        }
        return session;
    },
    async jwt({ token, user, trigger, session }) {
        if (user) {
            token.id = user.id;
            token.role = (user as any).role;
        }

        if (trigger === "update" && session) {
            token = { ...token, ...session }
        }

        return token;
    }
  }
}
