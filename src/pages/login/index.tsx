import Authentication from '@/components/profile/Authentication'
import MainLayout from '@/layouts/MainLayout'
import { NextLayout } from '@/types'

const LoginPage: NextLayout = () => {
  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Authentication />
      </div>
    </div>
  )
}

export default LoginPage

LoginPage.getLayout = page => <MainLayout>{page}</MainLayout>
