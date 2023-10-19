import { useUpdateUserMutation } from '@/redux/api/usersApi'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import ConfirmationModal from '../ConfirmationModal'

const Account = () => {
  const { data } = useSession()

  const [mentorRoleRequest, setMentorRoleRequest] = useState('')
  const [updateUser] = useUpdateUserMutation()

  const mentorRoleRequestHandler = async (id: string) => {
    const finalData = { role: 'mentor' }
    const res = await updateUser({ id, data: finalData }).unwrap()

    if (res.status) {
      toast.success('Update successfull. Please login again.')
      signOut({ redirect: true, callbackUrl: '/profile' })
    } else {
      toast.error(res.message)
    }
  }

  return (
    <div className="">
      <h3 className="text-lg font-medium">
        Hey {data?.user.name.firstName}, Welcome to &quot;Mentor Plus&quot;
      </h3>
      <p className="text-xs">{data?.user.email.address}</p>

      {data?.user._id && data?.user.role === 'student' && (
        <>
          <div className="mt-5">
            <button className="btn btn-warning btn-sm" onClick={() => setMentorRoleRequest(data?.user._id)}>
              Make me mentor
            </button>
          </div>

          <ConfirmationModal
            id="cancel_booking_modal"
            isOpen={mentorRoleRequest}
            handleCloseModal={setMentorRoleRequest}
            handleConfirmed={mentorRoleRequestHandler}
            title="MENTOR ROLE ALERT"
            description="Are you certain you want to transition to the mentor role?"
            confirmButtonText="YES MAKE ME"
          />
        </>
      )}

      <p className="mt-10 lg:max-w-3xl">
        At Mentor Plus, we&apos;ve created a seamless and convenient platform that brings mentors and students
        together for productive and insightful mentoring sessions. Whether you&apos;re a mentor looking to
        share your knowledge or a student seeking guidance, our platform is designed to make the appointment
        booking process easy and efficient.
      </p>
      <p className="mt-10 text-lg font-medium">Explore all your options here.</p>
    </div>
  )
}

export default Account
