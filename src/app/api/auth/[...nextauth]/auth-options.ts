import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { pagesOptions } from "./pages-options";
import { getUser } from "@/server/collection/user";
import { comparePassword } from "@/lib/ comparePassword";

export const authOptions: NextAuthOptions = {
  pages: {
    ...pagesOptions,
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.idToken,
          meta:
            token.user &&
            typeof token.user == "object" &&
            "meta" in token["user"]
              ? token.user.meta
              : {},
        },
      };
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      const parsedUrl = new URL(url, baseUrl);
      if (parsedUrl.searchParams.has("callbackUrl")) {
        return `${baseUrl}${parsedUrl.searchParams.get("callbackUrl")}`;
      }
      if (parsedUrl.origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any): Promise<any> {
        try {
        let email = credentials.email ? credentials.email.trim() : "";
        let password = credentials.password ? credentials.password : "";
          if (email && password) {
            let user: any = await getUser(email);
            console.log('User: ', user)
            console.log("User: ", user);
            if (!user)
              throw new Error(`User with email ${email} does not exist`);
            if (user?.error)
              console.log("User error: ", user.error)
              throw new Error(
                "Something went wrong wrong. Please try again later"
              );
            user = user?.data;
            if (!(await comparePassword(password, user?.password ?? "")))
              throw new Error("Your Email or Password is Incorrect.");

            const userData = {
              email: user.email,
              meta: {
                phone: user?.phone ?? "",
                is_admin: user?.is_admin,
                name: user?.name,
              },
            };
            return userData;
          } else {
            throw new Error("Please provide both Email and Password");
          }
        } catch (error) {
          console.log("Catched Error: ", error);
          throw error;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET
};
