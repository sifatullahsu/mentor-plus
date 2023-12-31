import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { BiTimer } from 'react-icons/bi'
import { IoLogOutOutline, IoSettingsOutline } from 'react-icons/io5'
import { MdOutlineArticle } from 'react-icons/md'

const AccountSidebar = () => {
  const { data: session } = useSession()

  return (
    <>
      <ul className="menu bg-base-200 rounded-box p-5 space-y-1">
        <li>
          <Link href="/profile">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/profile/account-settings">
            <IoSettingsOutline className="text-[20px]" /> Account Settings
          </Link>
        </li>
        {session?.user.role === 'mentor' && (
          <>
            <li>
              <Link href="/profile/appointments">
                <BiTimer className="text-[20px]" /> Appointments
              </Link>
            </li>
          </>
        )}
        {(session?.user.role === 'mentor' || session?.user.role === 'admin') && (
          <>
            <li>
              <Link href="/profile/services">
                <BiTimer className="text-[20px]" /> Services
              </Link>
            </li>
          </>
        )}
        {session?.user.role !== 'super_admin' && (
          <>
            <li>
              <Link href="/profile/bookings">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Bookings
              </Link>
            </li>
            <li>
              <Link href="/profile/blogs">
                <MdOutlineArticle className="text-[20px]" /> Blogs
              </Link>
            </li>
            <li>
              <Link href="/profile/feedbacks">
                <MdOutlineArticle className="text-[20px]" /> Feedbacks
              </Link>
            </li>
          </>
        )}

        {session?.user.role === 'admin' && (
          <>
            <li>
              <Link href="/profile/categories">
                <MdOutlineArticle className="text-[20px]" /> Categories
              </Link>
            </li>
            <li>
              <Link href="/profile/topics">
                <MdOutlineArticle className="text-[20px]" /> Topics
              </Link>
            </li>
            <li>
              <Link href="/profile/faqs">
                <MdOutlineArticle className="text-[20px]" /> Faqs
              </Link>
            </li>
          </>
        )}
        {(session?.user.role === 'admin' || session?.user.role === 'super_admin') && (
          <li>
            <Link href="/profile/users">
              <MdOutlineArticle className="text-[20px]" /> Users
            </Link>
          </li>
        )}
        <li className="pt-44">
          <button onClick={() => signOut({ redirect: true, callbackUrl: '/' })}>
            <IoLogOutOutline className="text-lg"></IoLogOutOutline> Logout
          </button>
        </li>
      </ul>
    </>
  )
}

export default AccountSidebar
