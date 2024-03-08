export interface Message {
  sentTime: Date
  body: string
  sender: "user" | "safety"
}
