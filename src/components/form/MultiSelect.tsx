import Multiselect from 'multiselect-react-dropdown'

type iItem = {
  key: string
  value: string
}

type iProps = {
  label: string
  data: iItem[]
  onChange: (data: iItem[] | []) => void
  defaultValue?: iItem[]
  singleSelect?: boolean
  selectionLimit?: number
}

const MultiSelect = ({
  label,
  data,
  defaultValue,
  onChange,
  singleSelect = false,
  selectionLimit = -1
}: iProps) => {
  return (
    <div className="form-control w-full">
      <label>
        <span>{label}</span>
      </label>
      <Multiselect
        options={data}
        selectedValues={defaultValue}
        onSelect={selectedList => onChange(selectedList)}
        onRemove={selectedList => onChange(selectedList)}
        singleSelect={singleSelect}
        selectionLimit={selectionLimit}
        displayValue="value"
        id="key"
      />
    </div>
  )
}

export default MultiSelect
