import heroPic from '@/assets/hero_section.png'
import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className="bg-gray-100 text-gray-800 border-b">
      <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-16 lg:flex-row lg:justify-between">
        <div className="mt-6 m-auto">
          <Image src={heroPic} alt="" />
        </div>
        <div className="flex flex-col justify-center p-3 md:p-6 md:pt-0 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
          <h1 className="text-4xl sm:text-6xl font-rajdhani font-bold leading-none mt-10">
            Unlock Your Full Potential with
            <span className="text-cyan-600"> Mentor Plus</span>
          </h1>
          <p className="mt-6 mb-8 text-lg text-neutral sm:mb-12">
            Connect with experienced mentors to accelerate your learning journey. Whether you&rsquo;re a
            student seeking guidance or a mentor looking to share your expertise, our platform brings
            knowledge and growth within reach.
          </p>
          <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            <Link
              href={'/services'}
              className="px-8 py-3 m-2 text-lg font-semibold rounded bg-cyan-600 text-gray-50"
            >
              Get started
            </Link>
            <Link
              href="/profile"
              className="px-8 py-3 m-2 text-lg border rounded text-gray-900 border-gray-300"
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
