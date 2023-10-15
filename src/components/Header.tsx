import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { BiLogoFirebase } from 'react-icons/bi'
import { HiBars3BottomLeft } from 'react-icons/hi2'
import { IoLogOutOutline } from 'react-icons/io5'

const Header = () => {
  const { data } = useSession()

  const items = () => {
    return (
      <>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/services">Services</Link>
        </li>
        <li>
          <Link href="/mentors">Mentors</Link>
        </li>
        <li>
          <Link href="/profile">{data ? 'My Profile' : 'Login / Registration'}</Link>
        </li>
        {data && (
          <li>
            <button onClick={() => signOut()}>
              <IoLogOutOutline className="text-lg"></IoLogOutOutline>
            </button>
          </li>
        )}
      </>
    )
  }

  return (
    <section className="border-b">
      <div className="container">
        <div className="navbar">
          <div className="md:navbar-start ">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <HiBars3BottomLeft fontSize={22} />
              </label>
              <ul className="menu menu-sm dropdown-content shadow bg-base-100 z-30">{items()}</ul>
            </div>
            <Link href="/" className="text-xl font-medium">
              <BiLogoFirebase className="inline text-[30px]" />
              Mentor Plus
            </Link>
          </div>
          <div className="navbar-end hidden lg:block text-right">
            <ul className="menu menu-horizontal px-1 -mr-5">{items()}</ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Header
