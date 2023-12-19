import logo from '@/assets/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { FaFacebook, FaGithub, FaInstagram, FaTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <>
      <div className="bg-gray-100 text-base-content px-5 py-10 md:p-20 border-y">
        <div className="container">
          <Link href="/">
            <Image src={logo} alt="" className="max-w-[150px] mx-auto" />
          </Link>
          <div className="flex justify-center flex-wrap space-x-3 mt-7 social-icons">
            <a href="https://www.facebook.com/" target="_blank">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/" target="_blank">
              <FaInstagram />
            </a>
            <a href="https://twitter.com/" target="_blank">
              <FaTwitter />
            </a>
            <a href="https://github.com/" target="_blank">
              <FaGithub />
            </a>
            <a href="https://www.youtube.com/" target="_blank">
              <FaYoutube />
            </a>
            <a href="https://web.whatsapp.com/" target="_blank">
              <FaWhatsapp />
            </a>
          </div>
          <div className="flex justify-center flex-wrap mt-7 footer-links">
            <Link href="/">Home</Link>
            <Link href="/services">Services</Link>
            <Link href="/blogs">Blogs</Link>
            <Link href="/faqs">Faqs</Link>
            <Link href="/login">Login / Registration</Link>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 text-gray-500">
        <div className="container">
          <div className="text-center p-5 text-sm uppercase">
            Copyright © 2023 - All right reserved by Mentor Plus
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
