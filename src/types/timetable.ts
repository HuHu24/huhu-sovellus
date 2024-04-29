export interface Timetable {
  days: {
    date: string
    events: {
      isActivity: boolean
      time: string
      title: string
      description: string
    }[]
  }[]
}
