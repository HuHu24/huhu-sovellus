import { format, parse } from "date-fns"

export default function formatDateTime(date: string, time: string): string {
  const parsedDate = parse(date, "yyyy-MM-dd", new Date())
  const parsedTime = parse(time, "HH:mm", new Date())

  const dateTime = new Date(
    parsedDate.getFullYear(),
    parsedDate.getMonth(),
    parsedDate.getDate(),
    parsedTime.getHours(),
    parsedTime.getMinutes()
  )

  return format(dateTime, "dd.MM HH:mm")
}
