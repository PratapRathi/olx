"use client"

interface SearchInputProps {
  value: string | undefined;
  onChange: (value: string) => void
  disabled?: boolean
  className?: string
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, disabled, className }) => {
  return (
    <input
      placeholder="Find..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={className}
    />
  )
}

export default SearchInput
