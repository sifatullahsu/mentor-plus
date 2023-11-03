/* eslint-disable @typescript-eslint/no-explicit-any */
import { iMeta, iTableData, iTableHeader } from '@/types'
import Link from 'next/link'
import { useState } from 'react'
import { AiOutlineEye } from 'react-icons/ai'
import { BiLink } from 'react-icons/bi'
import { MdOutlineDeleteSweep } from 'react-icons/md'
import ConfirmationModal from './ConfirmationModal'
import Pagination from './Pagination'

type iProps = {
  tableHeader: iTableHeader
  tableData: iTableData[]
  deleteHandler?: (id: string) => void
  isLoading: boolean
  meta?: iMeta
  setPagination?: (data: Partial<iMeta>) => void
}

const Table = ({ tableHeader, tableData, deleteHandler, isLoading, meta, setPagination }: iProps) => {
  tableData = tableData || []
  const [openDeleteModal, setOpenDeleteModal] = useState('')

  const handlerDelete = (id: string) => {
    if (deleteHandler) {
      deleteHandler(id)
    }
  }

  if (isLoading) return <div>Loading data</div>

  return (
    <>
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
              {tableData?.map((item, index: number) => {
                return (
                  <tr key={item.data[0]}>
                    {item.data.map((innerData: string, innerIndex: number) => {
                      if (innerIndex === 0) return <th key={innerIndex}>{index + 1}</th>
                      return <td key={innerIndex}>{innerData}</td>
                    })}
                    <td className="space-x-2 w-max">
                      {item?.others?.editLink && (
                        <Link href={item.others.editLink} className="btn btn-primary btn-sm btn-square">
                          <BiLink className="text-lg" />
                        </Link>
                      )}
                      {item?.others?.viewLink && (
                        <Link href={item.others.viewLink} className="btn btn-primary btn-sm btn-square">
                          <AiOutlineEye className="text-lg" />
                        </Link>
                      )}
                      {deleteHandler && (
                        <button
                          type="button"
                          onClick={() => setOpenDeleteModal(item.data[0])}
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

        <ConfirmationModal
          id="delete_modal"
          isOpen={openDeleteModal}
          handleCloseModal={setOpenDeleteModal}
          handleConfirmed={handlerDelete}
          title="DELETE ALERT"
          description="Are you sure, Do you want to delete the item?"
          confirmButtonText="YES DELETE"
        />
      </div>
      <div className="mt-10 flex justify-end">
        {meta && setPagination && <Pagination meta={meta} handlerFunction={setPagination} />}
      </div>
    </>
  )
}

export default Table
