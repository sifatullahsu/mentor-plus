type iProps = {
  title: string
  disabled?: boolean
  isLoading?: boolean
}

const SubmitButton = ({ title, disabled = false, isLoading = false }: iProps) => {
  return (
    <div>
      <button type="submit" disabled={disabled || isLoading} className="btn btn-secondary btn-sm mt-5">
        {isLoading && <span className="loading loading-spinner"></span>}
        {title}
      </button>
    </div>
  )
}

export default SubmitButton
