type iProps = {
  label: string
  name: string
  placeholder?: string
  required?: boolean
  defaultValue?: string
  disabled?: boolean
}

const TextareaField = ({
  label,
  name,
  placeholder,
  required = false,
  defaultValue,
  disabled = false
}: iProps) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <textarea
        name={name}
        className="textarea textarea-bordered h-24"
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        disabled={disabled}
      ></textarea>
    </div>
  )
}

export default TextareaField
