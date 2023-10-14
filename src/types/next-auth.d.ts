/* eslint-disable @typescript-eslint/consistent-type-definitions */
import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      _id: string
      username: number
      name: {
        firstName: string
        lastName: string
      }
      email: {
        address: string
        is_verified: boolean
      }
      number: {
        cc: '+880' | '+91' | '+92'
        digits: string
        is_verified: boolean
      }
      gender: 'Male' | 'Female' | 'Others'
      role: 'super_admin' | 'admin' | 'mentor' | 'student'
      status: 'Active' | 'Inactive' | 'Pending' | 'Disabled'
      access_token: string
      refresh_token: string
    }
  }
}
