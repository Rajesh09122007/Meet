import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          prompt: 'select_account',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user.email && user.email.toLowerCase().endsWith('@mvsrec.edu.in')) {
        return true;
      }
      return '/?error=AccessDenied';
    },
    async session({ session }) {
      return session;
    },
  },
});

export { handler as GET, handler as POST };
