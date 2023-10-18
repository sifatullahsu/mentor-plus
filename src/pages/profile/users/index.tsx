/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from '@/components/Table'
import ProfileLayout from '@/layouts/ProfileLayout'
import { useGetUsersQuery } from '@/redux/api/usersApi'
import { NextLayout, iTableData, iTableHeader } from '@/types'
import Link from 'next/link'

const UsersPage: NextLayout = () => {
  const { data, isLoading } = useGetUsersQuery({})

  const tableHeader: iTableHeader = ['Username', 'Email', 'Role', 'Actons']

  const tableData: iTableData[] = data?.data?.map((item: any): iTableData => {
    const {
      _id,
      username,
      email: { address },
      role
    } = item

    return {
      data: [_id, username, address, role],
      others: {
        editLink: `/profile/users/${_id}`
      }
    }
  })

  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-lg font-medium mb-5">Users</h3>
        <Link href={`/profile/users/create`} className="btn btn-primary btn-sm">
          Create User
        </Link>
      </div>
      <Table tableHeader={tableHeader} tableData={tableData} isLoading={isLoading} />
    </div>
  )
}

export default UsersPage

UsersPage.getLayout = page => <ProfileLayout>{page}</ProfileLayout>
