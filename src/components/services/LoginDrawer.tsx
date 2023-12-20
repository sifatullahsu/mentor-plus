import React, { Dispatch } from 'react'
import { CiLogin } from 'react-icons/ci'
import Drawer from 'react-modern-drawer'
import Authentication from '../profile/Authentication'

const LoginDrawer = ({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean
  setIsOpen: Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <Drawer
      open={isOpen}
      onClose={() => setIsOpen(prevState => !prevState)}
      direction="right"
      className="!w-[300px] md:!w-[600px]"
      lockBackgroundScroll
      overlayOpacity={0.9}
      style={{ overflowY: 'auto' }}
    >
      <div className="p-5 md:p-10">
        <h3 className="text-sm font-medium -mb-6">
          <CiLogin className="inline mr-1 text-2xl mb-1" /> Please login to proceed next.
        </h3>
        <Authentication />
      </div>
    </Drawer>
  )
}

export default LoginDrawer
