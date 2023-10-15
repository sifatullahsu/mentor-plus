/* eslint-disable @typescript-eslint/no-explicit-any */

import MentorsGrid from './MentorsGrid'

type iProps = {
  data: any[]
  isLoading?: boolean
  isError?: boolean
  refetch?: () => void
}

const MentorsLoop = ({ data, isLoading, isError, refetch }: iProps) => {
  if (isError) {
    if (refetch) refetch()
    return <div>Error: somthing is wrong..</div>
  }

  if (isLoading) {
    return <div>Loading..</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {data?.map((mentor: any) => <MentorsGrid key={mentor._id} data={mentor} />)}
    </div>
  )
}

export default MentorsLoop
