import { useState } from 'react'
import TextField from './TextField'

const UniversityFields = () => {
  const [education, setEducation] = useState<Record<string, string | number>[]>([])

  const handlerEducation = (type: 'add' | 'remove', index: number) => {
    if (type === 'add') {
      const data = { institute: '', passing_year: '', cgpa: '' }
      setEducation([...education, data])
    }

    if (type === 'remove') {
      const newEducation = education.slice(0, index)
      setEducation([...newEducation])
    }
  }

  return (
    <div className="p-10 bg-gray-300 mt-5 rounded-xl">
      <button
        type="button"
        className="btn btn-primary btn-sm mb-5"
        onClick={() => handlerEducation('add', 0)}
      >
        + Add education filds
      </button>
      {education.map((item, index) => {
        return (
          <div key={index} className="border rounded-xl p-5 mb-5">
            <button
              type="button"
              className="btn btn-primary btn-sm mb-5"
              onClick={() => handlerEducation('remove', index)}
            >
              - Remove
            </button>
            <TextField label="Institute" name={`institute-${education}`} required={true} />
            <div className="grid grid-cols-2 gap-5">
              <TextField
                type="number"
                label="Passing Year"
                name={`passing_year_${education}`}
                required={true}
              />
              <TextField type="number" label="CGPA" name={`cgpa_${education}`} required={true} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default UniversityFields
