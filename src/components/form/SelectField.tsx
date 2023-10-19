/* eslint-disable @typescript-eslint/no-explicit-any */
type iProps = {
  label: string
  name: string
  data: {
    key: string
    value: string
  }[]
  required?: boolean
  onChange?: (id: string) => void
  defaultValue?: string | number
  disabled?: boolean
}

const SelectField = ({
  label,
  name,
  data,
  required = false,
  onChange,
  defaultValue,
  disabled = false
}: iProps) => {
  const onChangeHandler = (data: any) => {
    if (onChange) {
      onChange(data.target.value)
    }
  }

  return (
    <div className="form-control">
      <label>
        <span>{label}</span>
      </label>
      <select
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="select select-bordered"
        onChange={onChangeHandler}
        disabled={disabled}
      >
        <option value="">Pick one</option>
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
