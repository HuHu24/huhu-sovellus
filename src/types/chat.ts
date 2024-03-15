export interface Chat {
  id: string
  title: string
  hasBeenRead: {
    admin: boolean
    user: boolean
  }
  latestMessage: {
    body: string
    sender: "user" | "safety"
  }
}
