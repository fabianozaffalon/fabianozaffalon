import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const usuario = await prisma.user.findUnique({
        where: { email: user.email! },
      });
      return !!usuario && usuario.ativo;
    },
    async session({ session }) {
      const usuario = await prisma.user.findUnique({
        where: { email: session.user.email! },
      });
      if (usuario) {
        session.user.role = usuario.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
});
