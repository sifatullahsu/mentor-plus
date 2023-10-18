/* eslint-disable @typescript-eslint/no-explicit-any */
import { xLanguages, xStatus } from '@/global/constants'
import { useGetCategoriesQuery } from '@/redux/api/categoryApi'

import { useGetTopicsQuery } from '@/redux/api/topicApi'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Form from './form/Form'
import MultiSelect from './form/MultiSelect'
import SelectField from './form/SelectField'
import SubmitButton from './form/SubmitButton'
import TextField from './form/TextField'
import TextareaField from './form/TextareaField'

type iProps = {
  formHandler: (data: any) => void
  defaultValue?: Record<string, any>
  submitButtonText?: string
}

const ServiceForm = ({ formHandler, defaultValue, submitButtonText = 'Submit' }: iProps) => {
  const { data: session } = useSession()

  const defaultLanguages = defaultValue?.languages?.map((x: string) => ({ key: x, value: x }))
  const defaultTopics = defaultValue?.topics?.map((x: any) => ({ key: x._id, value: x.title }))
  const defaultCategory = defaultValue?.category
    ? [
        {
          key: defaultValue?.category?._id,
          value: defaultValue?.category?.title
        }
      ]
    : []

  const [languages, setLanguages] = useState(defaultLanguages)
  const [category, setCategory] = useState(defaultCategory)
  const [topics, setTopics] = useState(defaultTopics)

  const topicQuery = `category=$eq:${category[0]?.key}&size=20`
  const { data: categoryList, isLoading: categoryLoading } = useGetCategoriesQuery({ query: `size:20` })
  const { data: topicList, isLoading: topicLoading } = useGetTopicsQuery(
    { topicQuery },
    {
      refetchOnMountOrArgChange: true
    }
  )

  const categoryField = categoryList?.data?.map((item: any) => ({ key: item._id, value: item.title }))
  const topicField = topicList?.data?.map((item: any) => ({ key: item._id, value: item.title }))

  const localFormHandler = (from: any) => {
    const title = from?.title?.value
    const description = from?.description?.value
    const image = from?.image?.value
    const package_1 = parseInt(from?.package_1?.value)
    const package_2 = parseInt(from?.package_2?.value)
    const package_3 = parseInt(from?.package_3?.value)
    const status = from?.status?.value

    const categoryItem = category[0]?.key
    const topicsItem = topics?.map((x: any) => x.key) || []
    const languageItem = languages?.map((x: any) => x.key) || []

    if (!categoryItem) {
      toast.error('Category is required.')
    } else {
      const result = {
        title,
        description,
        image,
        category: categoryItem,
        topics: topicsItem,
        languages: languageItem,
        packages: [
          {
            title: 'Package 1',
            hours: 1,
            price: package_1
          },
          {
            title: 'Package 2',
            hours: 2,
            price: package_2
          },
          {
            title: 'Package 3',
            hours: 3,
            price: package_3
          }
        ],
        mentor: session?.user._id,
        status
      }

      formHandler(result)
      // from.reset()

      // if (!defaultValue) {
      //   setLanguages([])
      //   setCategory([])
      //   setTopics([])
      // }
    }
  }

  useEffect(() => {
    if (!category.length) {
      setTopics(undefined)
    }
  }, [category, topicQuery])

  if (categoryLoading || topicLoading) {
    return <div>Loading</div>
  }

  return (
    <Form submitHandler={localFormHandler}>
      <TextField label="Title" name="title" required={true} defaultValue={defaultValue?.title} />
      <TextareaField
        label="Description"
        name="description"
        required={true}
        defaultValue={defaultValue?.description}
      />
      <TextField label="Image" name="image" defaultValue={defaultValue?.image} />
      <MultiSelect
        label="Category"
        data={categoryField}
        defaultValue={category}
        onChange={setCategory}
        selectionLimit={1}
      />
      <MultiSelect
        label="Topics"
        data={topicField}
        defaultValue={topics}
        onChange={setTopics}
        selectionLimit={10}
      />
      <MultiSelect
        label="Languages"
        data={xLanguages}
        defaultValue={languages}
        onChange={setLanguages}
        selectionLimit={5}
      />
      <div className="grid grid-cols-3 gap-5">
        <TextField
          type="number"
          label="Package 1 Price (1 hr.)"
          name="package_1"
          required={true}
          defaultValue={defaultValue?.packages[0]?.price}
        />
        <TextField
          type="number"
          label="Package 2 Price (2 hr.)"
          name="package_2"
          required={true}
          defaultValue={defaultValue?.packages[1]?.price}
        />
        <TextField
          type="number"
          label="Package 3 Price (3 hr.)"
          name="package_3"
          required={true}
          defaultValue={defaultValue?.packages[2]?.price}
        />
      </div>
      <SelectField
        label="Status"
        name="status"
        data={xStatus}
        required={true}
        defaultValue={defaultValue ? (defaultValue?.status as string) : 'active'}
      />
      <SubmitButton title={submitButtonText} />
    </Form>
  )
}

export default ServiceForm
