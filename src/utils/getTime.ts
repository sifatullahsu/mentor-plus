const getTime = (date: Date, duration?: number) => {
  date = new Date(date)

  const currentDateTime = new Date() // Current date and time

  // Extract day, month, year, hour, and minute from the event date
  const eventDate = date.getDate()
  const eventMonth = date.getMonth() + 1 // Months are 0-based, so add 1
  const eventYear = date.getFullYear()
  let eventHour = date.getHours()
  const eventMinute = date.getMinutes()
  let ampm = 'AM'

  // Convert to 12-hour time format and determine AM/PM for the event
  if (eventHour >= 12) {
    ampm = 'PM'
    if (eventHour > 12) {
      eventHour -= 12
    }
  }

  // Calculate the difference between the current date and the event date in hours
  const timeDifferenceInHours = (date.getTime() - currentDateTime.getTime()) / 3600000

  // Determine the event status based on the duration and time difference
  let eventStatus
  if (duration) {
    if (timeDifferenceInHours < 0) {
      eventStatus = 'Past' // Updated from "Completed"
    } else if (timeDifferenceInHours < duration) {
      eventStatus = 'Ongoing' // Updated from "On going"
    } else {
      eventStatus = 'Upcoming' // Updated from "Coming"
    }
  }

  return {
    day: eventDate,
    month: eventMonth,
    year: eventYear,
    hour: eventHour,
    minute: eventMinute,
    ampm,
    status: eventStatus
  }
}

export default getTime
