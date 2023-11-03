/* eslint-disable @typescript-eslint/no-explicit-any */
import Heading from '@/components/Home/Heading'
import Pagination from '@/components/Pagination'
import ServiceSearch from '@/components/ServiceSearch'
import ServicesLoop from '@/components/reusable/services/ServicesLoop'
import MainLayout from '@/layouts/MainLayout'
import { useGetServicesQuery } from '@/redux/api/serviceApi'
import { NextLayout } from '@/types'
import { useState } from 'react'

const ServicesPage: NextLayout = () => {
  const [pagination, setPagination] = useState({ limit: 20, page: 1 })
  const [searchState, setSearchState] = useState({})

  const query =
    Object.values(searchState).join('&') +
    `&limit=${pagination.limit}&page=${pagination.page}&populate=mentor`
  const { data, isLoading, isError, refetch } = useGetServicesQuery(
    { query },
    { refetchOnMountOrArgChange: true }
  )

  const paginationHandler = (data: any) => {
    setPagination({ ...data })
  }

  if (isLoading) return <div>loading</div>

  return (
    <div className="container py-10 md:py-20">
      <Heading short="TOP CLASS MENTORS" title="Mentor's Services" description="" />
      <ServiceSearch searchState={searchState} setSearchState={setSearchState} />
      <ServicesLoop data={data?.data} isLoading={isLoading} isError={isError} refetch={refetch} />
      <div className="mt-14">
        <Pagination meta={data?.meta} handlerFunction={paginationHandler} />
      </div>
    </div>
  )
}

export default ServicesPage

ServicesPage.getLayout = page => <MainLayout>{page}</MainLayout>
