import Link from 'next/link'
import Heading from './Heading'

const SignUpSection = () => {
  return (
    <section className="py-6 bg-gray-100 text-gray-900">
      <div className="container space-y-8 p-4 md:p-10 md:px-24 xl:px-48">
        <Heading
          title="Sign Up Now"
          description="Join now to open the door to boundless possibilities! Your journey kicks off here—join today and dive into a world of endless potential. Don't miss out on the exciting opportunities that await you. Sign up now and start your adventure!"
          short=""
        />
        <div className="flex justify-center text-center flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-8">
          <Link href="/login" className="px-8 py-3 text-lg font-semibold rounded bg-cyan-600 text-gray-50">
            Get started
          </Link>
          <Link
            href="/services"
            className="px-8 py-3 text-lg font-normal border rounded bg-gray-800 text-gray-50 border-gray-700"
          >
            Learn more
          </Link>
        </div>
      </div>
    </section>
  )
}

export default SignUpSection
