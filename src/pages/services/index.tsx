import MainLayout from '@/layouts/MainLayout'
import { NextLayout } from '@/types'

const ServicesPage: NextLayout = () => {
  return <div></div>
}

export default ServicesPage

ServicesPage.getLayout = page => <MainLayout>{page}</MainLayout>
