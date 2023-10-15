import ServicesLoop from '@/components/reusable/services/ServicesLoop'
import MainLayout from '@/layouts/MainLayout'
import { useGetServicesQuery } from '@/redux/api/serviceApi'
import { NextLayout } from '@/types'

const ServicesPage: NextLayout = () => {
  const { data, isLoading, isError, refetch } = useGetServicesQuery({ query: undefined })

  return (
    <div className="container py-10">
      <ServicesLoop data={data?.data} isLoading={isLoading} isError={isError} refetch={refetch} />
    </div>
  )
}

export default ServicesPage

ServicesPage.getLayout = page => <MainLayout>{page}</MainLayout>
