import { AuthOptions } from 'next-auth';
import bcrypt from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/prisma/client';
import { User } from '@prisma/client';

export const authOptions: AuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: { type: 'text' },
                password: { type: 'password' },
            },
            async authorize(credentials) {
                if (
                    credentials?.username === undefined ||
                    credentials?.password === undefined
                ) {
                    return null;
                }

                const user = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { email: credentials.username },
                            { username: credentials.username },
                        ],
                    },
                });

                if (!user) {
                    return null;
                }

                const isPasswordValid = bcrypt.compareSync(
                    credentials.password,
                    user.password,
                );

                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: user.id,
                };
            },
        }),
    ],
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
                // Fetch user data once during login
                const prismaUser = await prisma.user.findUnique({
                    where: {
                        id: user.id,
                    },
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        username: true,
                        email: true,
                        avatar: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                });
                token.user = prismaUser;
            }

            return token;
        },
        session: async ({ session, token }) => {
            // Only fetch user data if not already in token
            if (!token.user) {
                const prismaUser = await prisma.user.findUnique({
                    where: {
                        id: token.id as string,
                    },
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        username: true,
                        email: true,
                        avatar: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                });

                if (prismaUser) {
                    token.user = prismaUser;
                }
            }

            session.user = token.user as Omit<User, 'password'>;
            return session;
        },
        redirect: async ({ url, baseUrl }) => {
            // If the URL is relative, make it absolute
            if (url.startsWith('/')) {
                return `${baseUrl}${url}`;
            }
            // If the URL is on the same origin, allow it
            if (new URL(url).origin === baseUrl) {
                return url;
            }
            // Otherwise, redirect to the base URL
            return baseUrl;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};
