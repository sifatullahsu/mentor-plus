type iProps = {
  id: string
  isOpen: string | boolean
  handleCloseModal: (x: string | boolean) => void
  title: string
  description?: string
}

const Modal = ({ id, isOpen = false, handleCloseModal, title, description }: iProps) => {
  return (
    <dialog id={id} className="modal" open={!!isOpen}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        {description && <p className="py-4">{description}</p>}

        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-primary btn-sm" onClick={() => handleCloseModal('')}>
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  )
}

export default Modal
