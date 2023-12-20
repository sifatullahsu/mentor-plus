import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', required: true },
        password: { label: 'Password', type: 'password', required: true }
      },
      async authorize(credentials) {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password
          })
        }

        const res = await fetch(`${SERVER_URL}/api/v1/auth/login`, options)
        const user = await res.json()

        return user ? user.data : null
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ token, session }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session.user = token as any
      return session
    }
  }
}

export default NextAuth(options)
