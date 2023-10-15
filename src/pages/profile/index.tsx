import Account from '@/components/profile/Account'
import Authentication from '@/components/profile/Authentication'
import MainLayout from '@/layouts/MainLayout'
import { NextLayout } from '@/types'
import { useSession } from 'next-auth/react'

const ProfilePage: NextLayout = () => {
  const { data: user } = useSession()

  return (
    <div>
      {user ? (
        <div>
          <Account />
        </div>
      ) : (
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Authentication />
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfilePage

ProfilePage.getLayout = page => <MainLayout>{page}</MainLayout>
