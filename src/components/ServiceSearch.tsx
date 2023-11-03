/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetCategoriesQuery } from '@/redux/api/categoryApi'
import Form from './form/Form'

type iProps = {
  searchState: Record<string, string>
  setSearchState: (data: any) => void
}

const ServiceSearch = ({ searchState, setSearchState }: iProps) => {
  const { data, isLoading } = useGetCategoriesQuery({ query: 'limit=20' })

  const handler = (key: 'search' | 'min' | 'max' | 'category', value: string) => {
    if (key === 'search') {
      if (value.length > 0) {
        setSearchState({ ...searchState, search: `title=$regex:/${value}/i` })
      } else {
        const { search, ...others } = searchState
        setSearchState({ ...others })
      }
    }

    if (key === 'min') {
      if (value.length > 0) {
        setSearchState({ ...searchState, min: `packages.price=$gte:${value}` })
      } else {
        const { min, ...others } = searchState
        setSearchState({ ...others })
      }
    }

    if (key === 'max') {
      if (value.length > 0) {
        setSearchState({ ...searchState, max: `packages.price=$lte:${value}` })
      } else {
        const { max, ...others } = searchState
        setSearchState({ ...others })
      }
    }

    if (key === 'category') {
      if (value.length > 0) {
        setSearchState({ ...searchState, category: `category=$eq:${value}` })
      } else {
        const { category, ...others } = searchState
        setSearchState({ ...others })
      }
    }
  }

  if (isLoading) return <div>loading</div>

  return (
    <Form submitHandler={() => null}>
      <div className="md:join mb-10">
        <input
          className="input w-full input-bordered join-item"
          defaultValue={searchState?.search as string}
          placeholder="Search"
          onChange={e => handler('search', e.target.value)}
        />
        <input
          type="number"
          min={0}
          defaultValue={searchState?.min as string}
          className="input input-bordered join-item w-1/3 md:w-32"
          placeholder="Min price"
          onChange={e => handler('min', e.target.value)}
        />
        <input
          type="number"
          min={0}
          defaultValue={searchState?.max as string}
          className="input input-bordered join-item w-1/3 md:w-32 mt-1"
          placeholder="Max price"
          onChange={e => handler('max', e.target.value)}
        />
        <select
          className="select select-bordered join-item w-1/3 -mt[5px]"
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
