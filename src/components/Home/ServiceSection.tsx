import { useGetServicesQuery } from '@/redux/api/serviceApi'
import ServicesLoop from '../reusable/services/ServicesLoop'
import Heading from './Heading'

const ServiceSection = () => {
  const { data, isLoading, isError, refetch } = useGetServicesQuery({ query: `limit=8&populate=mentor` })

  return (
    <div className="container py-12 md:py-20">
      <Heading
        short="Top class mentors"
        title="Mentor's Services"
        description="Discover tailored guidance and expertise from our dedicated mentors. Benefit from a diverse array of
        specialized services aimed at nurturing your personal and professional growth."
      />
      <ServicesLoop data={data?.data} isLoading={isLoading} isError={isError} refetch={refetch} />
    </div>
  )
}

export default ServiceSection
