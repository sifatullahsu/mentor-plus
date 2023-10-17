import getTime from '@/utils/getTime'

const ServiceDate = ({ date, duration }: { date: Date | undefined; duration: number }) => {
  if (!date) return <div>Date not found.</div>

  const { day, month, year, hour, minute, ampm, status } = getTime(date, duration)

  return (
    <div>
      <div>
        {day}-{month}-{year} at {hour}:{minute} {ampm}
      </div>
      <div
        className={`mt-5 badge ${
          status === 'Upcoming' ? 'badge-primary' : status === 'Ongoing' ? 'badge-secondary' : 'badge-accent'
        }`}
      >
        {status}
      </div>
    </div>
  )
}

export default ServiceDate
