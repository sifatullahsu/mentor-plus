import Footer from '@/components/Footer'
import Header from '@/components/Header'
import AccountSidebar from '@/components/profile/AccountSidebar'
import { iChildren } from '@/types'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const ProfileLayout = ({ children }: iChildren) => {
  const { data: user, status } = useSession()
  const router = useRouter()

  if (status === 'loading' && !router.isReady) return <div>loading</div>

  return (
    <div>
      <Header />
      {user ? (
        <div className="container py-10">
          <div className="grid grid-cols-4 gap-5">
            <div className="col-span-1">
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

      <Footer />
    </div>
  )
}

export default ProfileLayout
