import Link from 'next/link'

const SignUpSection = () => {
  return (
    <section className="py-6 bg-gray-100 text-gray-900">
      <div className="container mx-auto flex flex-col items-center justify-center p-4 space-y-8 md:p-10 md:px-24 xl:px-48">
        <h1 className="text-5xl font-bold leading-none text-center">Sign up now</h1>
        <p className="text-xl font-medium text-center">
          Join today for endless possibilities. Your journey begins here.
        </p>
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-8">
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
