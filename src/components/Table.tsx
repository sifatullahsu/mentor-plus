/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
import { BiLink } from 'react-icons/bi'
import { MdOutlineDeleteSweep } from 'react-icons/md'

type iProps = {
  tableHeader: string[]
  tableData: string[][]
  url?: string
  deleteHandler?: (id: string) => void
  isLoading: boolean
}

const Table = ({ tableHeader, tableData, url, deleteHandler, isLoading }: iProps) => {
  // const [openDeleteModal, setOpenDeleteModal] = useState('')
  // const handlerDeleteConfirmation = (isDelete: boolean) => {
  //   console.log(isDelete)
  // }

  if (isLoading) return <div>Loading data</div>

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            {tableHeader.map((item: string, index: number) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        {tableData?.length !== 0 && (
          <tbody>
            {tableData?.map((item: string[], index: number) => {
              return (
                <tr key={item[0]}>
                  {item.map((innerData: string, innerIndex: number) => {
                    if (innerIndex === 0) return <th key={innerIndex}>{index + 1}</th>
                    return <td key={innerIndex}>{innerData}</td>
                  })}
                  <td className="space-x-2">
                    {url && (
                      <Link href={`${url}/${item[0]}`} className="btn btn-primary btn-sm btn-square">
                        <BiLink className="text-lg" />
                      </Link>
                    )}
                    {deleteHandler && (
                      <button
                        type="button"
                        onClick={() => deleteHandler(item[0])}
                        className="btn btn-primary btn-sm btn-square"
                      >
                        <MdOutlineDeleteSweep className="text-lg" />
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        )}
      </table>
      {tableData?.length === 0 && (
        <div className="bg-base-200 text-center p-10">No data found in the database.</div>
      )}

      {/* <Modal
        id="delete_modal"
        isOpen={openDeleteModal}
        handleCloseModal={setOpenDeleteModal}
        title="Do You Want to Delete The Item?"
      /> */}
    </div>
  )
}

export default Table
