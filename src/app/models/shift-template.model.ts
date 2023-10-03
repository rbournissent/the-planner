export interface ShiftTemplate {
  id: number
  name: string
  startTime: Date
  endTime: Date
}

export const UnknownTemplate: ShiftTemplate = {
  id: 1,
  name: 'Unknown Template',
  startTime: new Date(),
  endTime: new Date()
}
