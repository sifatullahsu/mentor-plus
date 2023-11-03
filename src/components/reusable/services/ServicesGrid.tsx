/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'

const ServicesGrid = ({ data }: any) => {
  // function findLowestPricePackage(packages: any) {
  //   return packages?.reduce(
  //     (minPackage: any, item: any) => (item.price < minPackage.price ? item : minPackage),
  //     packages[0]
  //   )
  // }

  // const lowestPricePackage = findLowestPricePackage(data.packages)
  const prices = data.packages.map((i: any) => '$' + i.price).join(' | ')

  return (
    <div>
      <img src={data.image} alt="" className="border rounded-xl max-h-[150px] w-full object-cover" />
      <div className="px-1 py-2">
        <div className="mt-2">
          <Link
            href={`/mentors/${data?.mentor?.username}`}
            className="text-primary font-medium hover:underline"
          >
            <AiOutlineUsergroupAdd className="inline mr-1 text-lg" />
            {data?.mentor?.username}
          </Link>
        </div>
        <div className="text-lg font-bold text-secondary font-rajdhani min-h-[56px]">
          <Link href={`/services/${data.uid}`} className="hover:underline">
            {data.title}
          </Link>
        </div>
        <div className="font-medium mt-5">
          <span className="text-sm">Price:</span> {prices}
        </div>
      </div>
    </div>
  )
}

export default ServicesGrid
