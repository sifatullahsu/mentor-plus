import MainLayout from '@/layouts/MainLayout'
import { NextLayout } from '@/types'
import { signIn, signOut, useSession } from 'next-auth/react'

const HomePage: NextLayout = () => {
  const { data } = useSession()
  console.log(data)

  const login = async () => {
    const username = 'sifatullah'
    const password = '12345'

    const res = signIn('credentials', {
      username,
      password,
      redirect: false
    })

    console.log(res)
  }

  const logout = () => {
    signOut()
  }
  return (
    <div>
      This is Home page
      <button onClick={login}>Click me</button>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default HomePage

HomePage.getLayout = page => <MainLayout>{page}</MainLayout>
