export const isSameDay = (dateA: Date, dateB: Date): boolean => {
  return dateA.toLocaleDateString() === dateB.toLocaleDateString()
}
