import { h } from 'preact'

const AutoSuggestion = ({ suggestions, onUpdateSearchKeyword, onUpdateShowAutoSuggestion }) => {
  const element = suggestions.map((value) => {
    return <li
      class="suggestion"
      onClick={(e) => {
        onUpdateSearchKeyword(value)
        onUpdateShowAutoSuggestion(false)
      }}
    >
      {value}
    </li>
  })

  return (
    <ul class="keyword-dropdown">
      {element}
    </ul>
  )
}

export default AutoSuggestion
