import MainLayout from '@/layouts/MainLayout'
import { NextLayout } from '@/types'

const MentorsPage: NextLayout = () => {
  return <div></div>
}

export default MentorsPage

MentorsPage.getLayout = page => <MainLayout>{page}</MainLayout>
