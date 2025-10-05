import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../../../lib/mongo";
import { verifyPass } from "../../../../../utils/hash";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const client = await clientPromise;
                const usersCollection = client.db("next_Blog").collection("users");
                const user = await usersCollection.findOne({ email: credentials.email });
                if (!user) return null;
                const isValid = await verifyPass(credentials.password, user.password);
                if (!isValid) return null;

                return { id: user._id.toString(), name: user.fullname, email: user.email, image: user.photoUrl };
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                const client = await clientPromise;
                const usersCollection = client.db("next_Blog").collection("users");

                const existingUser = await usersCollection.findOne({ email: user.email });

                if (!existingUser) {
                    const newUser = {
                        fullname: user.name,
                        email: user.email,
                        photoUrl: user.image,
                        password: null,
                        likedPosts: [],
                        savedPosts: [],
                    };
                    await usersCollection.insertOne(newUser);
                }
            }
            return true;
        },

        async jwt({ token, user }) {
            if (user) token.user = user;
            return token;
        },
        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };