import MentorsLoop from '@/components/reusable/mentors/MentorsLoop'
import MainLayout from '@/layouts/MainLayout'
import { useGetUsersQuery } from '@/redux/api/usersApi'
import { NextLayout } from '@/types'

// This page for future scale
const MentorsPage: NextLayout = () => {
  const { data, isLoading, isError, refetch } = useGetUsersQuery({ query: undefined })

  return (
    <div className="container py-10">
      <MentorsLoop data={data?.data} isLoading={isLoading} isError={isError} refetch={refetch} />
    </div>
  )
}

export default MentorsPage

MentorsPage.getLayout = page => <MainLayout>{page}</MainLayout>
