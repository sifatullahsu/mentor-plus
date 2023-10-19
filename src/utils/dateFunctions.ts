export function addDays(currentDate: Date, daysToAdd: number): Date {
  const newDate = new Date(currentDate)
  newDate.setDate(newDate.getDate() + daysToAdd)
  return newDate
}

export function setHoursAndMinutes(date: Date, hours: number, minutes: number): Date {
  const newDate = new Date(date)
  newDate.setHours(hours)
  newDate.setMinutes(minutes)
  return newDate
}
