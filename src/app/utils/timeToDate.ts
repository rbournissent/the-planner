export const timeToDate = (time: string): Date => {
  const date = new Date()
  const [hours, minutes] = time.split(':')
    .map(part => parseInt(part))
  date.setHours(hours, minutes)

  return date
}
