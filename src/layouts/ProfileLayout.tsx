import Header from '@/components/Header'
import AccountSidebar from '@/components/profile/AccountSidebar'
import { iChildren } from '@/types'
import { useSession } from 'next-auth/react'

const ProfileLayout = ({ children }: iChildren) => {
  const { data: user } = useSession()

  return (
    <div>
      <Header />
      {user ? (
        <div className="container py-10">
          <div className="grid gap-5 profile-dash">
            <div className="col-span-1 ">
              <AccountSidebar />
            </div>
            <div className="col-span-3" style={{ gridColumn: 'span 3 / span 3' }}>
              {children}
            </div>
          </div>
        </div>
      ) : (
        <>{children}</>
      )}

      {/* <Footer /> */}
    </div>
  )
}

export default ProfileLayout
