type iProps = {
  label: string
  name: string
  data: {
    key: string
    value: string
  }[]
  required?: boolean
}

const SelectField = ({ label, name, data, required = false }: iProps) => {
  return (
    <div className="form-control">
      <label>
        <span>{label}</span>
      </label>
      <select name={name} required={required} className="select select-bordered">
        <option disabled selected>
          Pick one
        </option>
        {data.map(item => {
          return (
            <option value={item.key} key={item.key}>
              {item.value}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default SelectField
