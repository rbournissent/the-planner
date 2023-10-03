import { ShiftTemplate } from "../models/shift-template.model"

const isDateInBetween = (date: Date, start: Date, end: Date): boolean => {
  return date.getTime() > start.getTime() &&
    date.getTime() < end.getTime()
}

export const rangeConflict = (a: ShiftTemplate, b: ShiftTemplate): boolean => {
  const { startTime: startA, endTime: endA } = a
  const { startTime: startB, endTime: endB } = b

  return isDateInBetween(startB, startA, endA) ||
    isDateInBetween(endB, startA, endA)
}
