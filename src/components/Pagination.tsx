import { iMeta } from '@/types'

type iProps = {
  meta: iMeta
  handlerFunction: (data: Partial<iMeta>) => void
}

const Pagination = ({ meta, handlerFunction }: iProps) => {
  const { page, limit, count } = meta

  // Calculate the number of pages based on the count and limit
  const totalPages = Math.ceil(count / limit)

  // Generate an array of page numbers
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)

  const updateMeta = (newData: Partial<iMeta>) => {
    const updatedMeta: iMeta = { ...meta, ...newData }
    handlerFunction(updatedMeta)
  }

  return (
    <div>
      <div className="join">
        <button
          className="join-item btn"
          onClick={() => updateMeta({ page: page - 1 })}
          disabled={page === 1}
        >
          Previous
        </button>

        {pageNumbers.map(pageNumber => (
          <button
            key={pageNumber}
            className={`join-item btn ${pageNumber === page ? 'btn-active' : ''}`}
            onClick={() => updateMeta({ page: pageNumber })}
          >
            {pageNumber}
          </button>
        ))}

        <button
          className="join-item btn"
          onClick={() => updateMeta({ page: page + 1 })}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Pagination
