import MainLayout from '@/layouts/MainLayout'
import { NextLayout } from '@/types'

const LoginPage: NextLayout = () => {
  return (
    <div>
      <div>This is login page</div>
    </div>
  )
}

export default LoginPage

LoginPage.getLayout = page => <MainLayout>{page}</MainLayout>
