type iProps = {
  id: string
  isOpen: string
  handleCloseModal: (x: string) => void
  handleConfirmed: (x: string) => void
  title: string
  description?: string
  confirmButtonText?: string
}

const ConfirmationModal = ({
  id,
  isOpen = '',
  handleCloseModal,
  handleConfirmed,
  title,
  description,
  confirmButtonText = 'YES'
}: iProps) => {
  const isConfirmed = (confirmed: boolean) => {
    if (confirmed) {
      handleConfirmed(isOpen)
    }
    handleCloseModal('')
  }

  return (
    <dialog id={id} className="modal" open={isOpen ? true : false}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        {description && <p className="py-4">{description}</p>}

        <div className="modal-action">
          <div className="space-x-4">
            <button className="btn btn-ghost btn-sm" onClick={() => isConfirmed(false)}>
              Close
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => isConfirmed(true)}>
              {confirmButtonText}
            </button>
          </div>
        </div>
      </div>
    </dialog>
  )
}

export default ConfirmationModal
