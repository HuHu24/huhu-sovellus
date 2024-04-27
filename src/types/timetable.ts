export interface Timetable {
  days: {
    date: string
    events: {
      time: string
      title: string
      description: string
    }[]
  }[]
}
