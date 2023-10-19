type iProps = {
  title: string
  disabled?: boolean
}

const SubmitButton = ({ title, disabled = false }: iProps) => {
  return (
    <div>
      <button type="submit" disabled={disabled} className="btn btn-secondary btn-sm mt-5">
        {title}
      </button>
    </div>
  )
}

export default SubmitButton
