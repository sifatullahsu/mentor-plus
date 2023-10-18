import { useSession } from 'next-auth/react'

const Account = () => {
  const { data } = useSession()

  return (
    <div className="">
      <h3 className="text-lg font-medium">Hey {data?.user.name.firstName},</h3>
      <p className="text-xs">{data?.user.email.address}</p>
    </div>
  )
}

export default Account
