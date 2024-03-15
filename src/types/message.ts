export interface Message {
  createdAt: Date
  body: string
  sender: "user" | "safety"
}
