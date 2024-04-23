export default interface MenuButtonProps {
  title: string
  options: string[]
  isTimeInput?: boolean
  className?: string
  onOptionChange?: (option: string) => void
  value?: string | string[]
}
