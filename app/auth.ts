import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const jwtRes = await fetch(
          `${process.env.BACKEND_URL}/auth/jwt/create`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          },
        );
        if (jwtRes.ok) {
          const jwt = await jwtRes.json();
          const userRes = await fetch(
            `${process.env.BACKEND_URL}/auth/users/me`,
            {
              headers: {
                Authorization: `JWT ${jwt.access}`,
              },
            },
          );
          const userData = await userRes.json();
          return {
            id: userData?.id,
            access: jwt?.access,
            email: userData?.email,
            image: userData?.image,
            isAdmin: userData?.is_staff,
          };
        }
        if (!jwtRes.ok) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT session
    maxAge: 60 * 60 * 24 * 7 * 51, // 51 weeks  (in seconds)
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 7 * 51, // Optional, also 51 weeks
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user?.email;
        token.image = user?.image;
        token.isAdmin = user?.isAdmin;
        token.access = user?.access;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token?.id;
      session.user.email = token?.email;
      session.user.name = token?.email?.split("@")[0];
      session.user.isAdmin = token?.isAdmin;
      session.user.image = token?.image;
      session.access = token?.access;
      return session;
    },
  },
});
