import BlogSection from '@/components/Home/BlogSection'
import BridgeSection from '@/components/Home/BridgeSection'
import FaqSection from '@/components/Home/FaqSection'
import Hero from '@/components/Home/Hero'
import ReviewSection from '@/components/Home/ReviewSection'
import ServiceSection from '@/components/Home/ServiceSection'
import SignUpSection from '@/components/Home/SignUpSection'
import MainLayout from '@/layouts/MainLayout'
import { NextLayout } from '@/types'

const HomePage: NextLayout = () => {
  return (
    <div>
      <Hero />
      <ServiceSection />
      <FaqSection />
      <BlogSection />
      <SignUpSection />
      <BridgeSection />
      <ReviewSection />
    </div>
  )
}

export default HomePage

HomePage.getLayout = page => <MainLayout>{page}</MainLayout>
