/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetCategoriesQuery } from '@/redux/api/categoryApi'
import { Dispatch, SetStateAction } from 'react'
import Form from './form/Form'

type iProps = {
  searchState: Record<string, unknown>
  setSearchState: Dispatch<SetStateAction<Record<string, unknown>>>
}

const ServiceSearch = ({ searchState, setSearchState }: iProps) => {
  const { data, isLoading } = useGetCategoriesQuery({ query: 'size=20' })

  const handler = (key: 'search' | 'min' | 'max' | 'category', value: string) => {
    if (key === 'search') {
      if (value.length > 0) {
        setSearchState({ ...searchState, search: `search=${value}` })
      } else {
        const { search, ...others } = searchState
        setSearchState({ ...others })
      }
    }

    if (key === 'min') {
      if (value.length > 0) {
        setSearchState({ ...searchState, min: `min=${value}` })
      } else {
        const { min, ...others } = searchState
        setSearchState({ ...others })
      }
    }

    if (key === 'max') {
      if (value.length > 0) {
        setSearchState({ ...searchState, max: `max=${value}` })
      } else {
        const { max, ...others } = searchState
        setSearchState({ ...others })
      }
    }

    if (key === 'category') {
      if (value.length > 0) {
        setSearchState({ ...searchState, category: `category=${value}` })
      } else {
        const { category, ...others } = searchState
        setSearchState({ ...others })
      }
    }
  }

  if (isLoading) return <div>loading</div>

  return (
    <Form submitHandler={() => null}>
      <div className="join mb-10">
        <div>
          <div>
            <input
              className="input input-bordered join-item"
              defaultValue={searchState?.search as string}
              placeholder="Search"
              onChange={e => handler('search', e.target.value)}
            />
          </div>
        </div>
        <div>
          <div>
            <input
              type="number"
              min={0}
              defaultValue={searchState?.min as string}
              className="input input-bordered join-item w-32"
              placeholder="Min price"
              onChange={e => handler('min', e.target.value)}
            />
          </div>
        </div>
        <div>
          <div>
            <input
              type="number"
              min={0}
              defaultValue={searchState?.max as string}
              className="input input-bordered join-item w-32"
              placeholder="Max price"
              onChange={e => handler('max', e.target.value)}
            />
          </div>
        </div>
        <select
          className="select select-bordered join-item"
          defaultValue={searchState?.category as string}
          onChange={e => handler('category', e.target.value)}
        >
          <option value="">Filter</option>
          {data?.data?.map((item: any) => {
            return (
              <option key={item._id} value={item._id}>
                {item.title}
              </option>
            )
          })}
        </select>
        <div className="indicator">
          <span className="btn join-item">Search</span>
        </div>
      </div>
    </Form>
  )
}

export default ServiceSearch
