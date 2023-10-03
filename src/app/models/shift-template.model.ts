export interface ShiftTemplate {
  id: number
  name: string
  startTime: Date
  endTime: Date
}

export type ShiftTemplateData = Omit<ShiftTemplate, 'id'>

export interface ShiftTemplateEdit extends Omit<ShiftTemplate, 'id' | 'startTime' | 'endTime'> {
  startTime: string
  endTime: string
}

export const UnknownTemplate: ShiftTemplate = {
  id: 1,
  name: 'Unknown Template',
  startTime: new Date(),
  endTime: new Date()
}
