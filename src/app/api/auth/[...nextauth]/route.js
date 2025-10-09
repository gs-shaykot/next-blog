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

                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.fullname,
                    image: user.photoUrl,
                    role: user.role
                };
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
            const client = await clientPromise;
            const db = client.db("next_Blog");

            const usersCollection = db.collection("users");
            const activitiesCollection = db.collection("activities");

            const existingUser = await usersCollection.findOne({ email: user.email });

            if (!existingUser) {
                const newUser = {
                    fullname: user.name,
                    email: user.email,
                    photoUrl: user.image,
                    password: null,
                    likedPosts: [],
                    savedPosts: [],
                    role: "user",
                    createdAt: new Date(),
                };

                const result = await usersCollection.insertOne(newUser);
                user.id = result.insertedId.toString();

                await activitiesCollection.insertOne({
                    type: "register",
                    userEmail: user.email,
                    userName: user.name,
                    photoUrl: user.image,
                    timestamp: new Date(),
                    provider: account.provider,
                });
            } else {
                user.id = existingUser._id.toString();
            }

            return true;
        },

        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;

            }

            if (trigger === "update") {
                const client = await clientPromise;
                const usersCollection = client.db("next_Blog").collection("users");
                const dbUser = await usersCollection.findOne({ email: token.email });

                if (dbUser) {
                    token.id = dbUser._id.toString();
                    token.role = dbUser.role || "user";
                    token.name = dbUser.fullname;
                    token.picture = dbUser.photoUrl;
                }
            }

            if (!token.id || !token.role) {
                const client = await clientPromise;
                const usersCollection = client.db("next_Blog").collection("users");
                const dbUser = await usersCollection.findOne({ email: token.email });
                if (dbUser) {
                    token.id = dbUser._id.toString();
                    token.role = dbUser.role || "user";
                }
            }

            return token;
        },

        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id;
                session.user.role = token.role;
                session.user.bio = token.bio
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
