type iProps = {
  title: string
}

const SubmitButton = ({ title }: iProps) => {
  return (
    <div>
      <button type="submit" className="btn btn-secondary btn-sm mt-5">
        {title}
      </button>
    </div>
  )
}

export default SubmitButton
