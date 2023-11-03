/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetReviewsQuery } from '@/redux/api/reviewApi'
import { BiStar } from 'react-icons/bi'
import Heading from './Heading'

const ReviewSection = () => {
  const { data, isLoading } = useGetReviewsQuery({ query: 'size=4' })

  if (isLoading) return <div></div>

  return (
    <div className="container py-20">
      <Heading
        short="What People Say"
        title="Customer Reviews"
        description="Explore what our users have to say about their experiences with our mentorship platform. We take pride in their valuable feedback."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {data?.data?.map((item: any) => {
          return (
            <div key={item._id} className="divide-y rounded-md divide-gray-150 bg-gray-100 text-gray-800">
              <div className="flex justify-between p-5">
                <div className="flex space-x-4">
                  <div>
                    <span className="text-xs text-gray-600">
                      {Math.floor(Math.random() * 7) + 1} days ago
                    </span>
                    <h4 className="font-rajdhani text-xl font-bold">{item?.title}</h4>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-yellow-500">
                  <BiStar />
                  <span className="text-xl font-bold">{item?.rating}</span>
                </div>
              </div>
              <div className="p-6 space-y-2  text-gray-600">
                <p>{item?.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ReviewSection
