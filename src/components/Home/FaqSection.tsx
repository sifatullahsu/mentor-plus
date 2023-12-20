/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetfaqsQuery } from '@/redux/api/faqApi'
import Heading from './Heading'

const FaqSection = () => {
  const { data, isLoading } = useGetfaqsQuery({ query: `limit=8` })

  if (isLoading) return <div></div>

  return (
    <div className="bg-gray-100 text-gray-800 border-y">
      <div className="container py-12 md:py-20">
        <Heading
          short="How it works"
          title="Frequently Asked Questions"
          description="Discover tailored guidance and expertise from our dedicated mentors. Benefit from a diverse array
        of specialized services aimed at nurturing your personal and professional growth."
        />

        <div className="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 divide-gray-300">
          {data?.data?.map((item: any) => {
            return (
              <details key={item._id}>
                <summary className="py-2 text-xl font-rajdhani font-bold outline-none cursor-pointer focus:underline">
                  {item.title}
                </summary>
                <div className="px-4 pb-4">
                  <p>{item.description}</p>
                </div>
              </details>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default FaqSection
