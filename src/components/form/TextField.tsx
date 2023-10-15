type iProps = {
  label: string
  name: string
  placeholder?: string
  required?: boolean
}

const TextField = ({ label, name, placeholder, required = false }: iProps) => {
  return (
    <div className="form-control w-full">
      <label>
        <span>{label}</span>
      </label>
      <input type="text" name={name} placeholder={placeholder} required={required} />
    </div>
  )
}

export default TextField
