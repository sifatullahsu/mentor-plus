/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'

const ServicesGrid = ({ data }: any) => {
  const lowestPricePackage = data.packages.reduce((a: any, b: any) => Math.min(a.price, b.price))

  return (
    <div>
      <img src={data.image} alt="" className="border rounded-xl" />
      <div className="px-1 py-2">
        <div className="mt-2">
          <Link href={`/mentors/${data?.mentor?.username}`} className="text-primary underline">
            <AiOutlineUsergroupAdd className="inline mr-1 text-lg" />
            {data?.mentor?.username}
          </Link>
        </div>
        <div className="text-lg font-medium ">
          <Link href={`/services/${data.mentor.username}/${data.uid}`} className="hover:underline">
            {data.title}
          </Link>
        </div>
        <div className="font-medium mt-5">From ${lowestPricePackage.price}</div>
      </div>
    </div>
  )
}

export default ServicesGrid
