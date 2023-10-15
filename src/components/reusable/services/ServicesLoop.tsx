/* eslint-disable @typescript-eslint/no-explicit-any */

import ServicesGrid from './ServicesGrid'

type iProps = {
  data: any[]
  isLoading?: boolean
  isError?: boolean
  refetch?: () => void
}
const ServicesLoop = ({ data, isLoading, isError, refetch }: iProps) => {
  if (isError) {
    if (refetch) refetch()
    return <div>Error: somthing is wrong..</div>
  }

  if (isLoading) {
    return <div>Loading..</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {data?.map((service: any) => <ServicesGrid key={service._id} data={service} />)}
    </div>
  )
}

export default ServicesLoop
