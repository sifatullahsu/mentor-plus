import ServiceSearch from '@/components/ServiceSearch'
import ServicesLoop from '@/components/reusable/services/ServicesLoop'
import MainLayout from '@/layouts/MainLayout'
import { useGetServicesWithSearchQuery } from '@/redux/api/serviceApi'
import { NextLayout } from '@/types'
import { useState } from 'react'

const ServicesPage: NextLayout = () => {
  const [searchState, setSearchState] = useState({})
  const query = Object.values(searchState).join('&')
  const { data, isLoading, isError, refetch } = useGetServicesWithSearchQuery(
    { query },
    { refetchOnMountOrArgChange: true }
  )

  if (isLoading) return <div>loading</div>

  return (
    <div className="container py-10">
      <ServiceSearch searchState={searchState} setSearchState={setSearchState} />
      <ServicesLoop data={data?.data} isLoading={isLoading} isError={isError} refetch={refetch} />
    </div>
  )
}

export default ServicesPage

ServicesPage.getLayout = page => <MainLayout>{page}</MainLayout>
