type iProps = {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
  defaultValue?: string | number
  disabled?: boolean
}

const TextField = ({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
  defaultValue,
  disabled = false
}: iProps) => {
  return (
    <div className="form-control w-full">
      <label>
        <span>{label}</span>
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        disabled={disabled}
      />
    </div>
  )
}

export default TextField
