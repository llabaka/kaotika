import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationParams: {
        hd: "aeg.eus",
      },
      authorization: {
        params: {
          scope: 'openid email profile https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.rosters.readonly https://www.googleapis.com/auth/classroom.topics.readonly https://www.googleapis.com/auth/classroom.student-submissions.students.readonly https://www.googleapis.com/auth/classroom.topics',
        },
      }
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl + "/dashboard";
    },
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  
  secret: process.env.NEXTAUTH_SECRET,
  redirectUri: process.env.NEXTAUTH_URL + "/api/auth/callback/google",
  
});