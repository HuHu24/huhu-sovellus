export interface User {
  claims: {
    subcamp: string
    job: boolean
  }
  uid: string
  email: string
}
