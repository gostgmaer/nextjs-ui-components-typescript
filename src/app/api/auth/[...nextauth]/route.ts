import authService from '@/lib/services/auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Extend the User type to include 'token' and 'user' properties
declare module "next-auth" {
  interface User {
    token?: string;
    user?: any;
  }
  interface Session {
    accessToken?: string;
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const user = await authService.userLogin(credentials as any);
          if (user?.token) {
            return { ...user, id: user.user.id };
          }
          return null;
        } catch {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.user = user.user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as typeof session.user;
      session.accessToken = typeof token.accessToken === 'string' ? token.accessToken : undefined;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

const { auth } = handler;
export { auth as GET, auth as POST };
