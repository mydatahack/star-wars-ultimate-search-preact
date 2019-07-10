import { h } from 'preact'
import { getSearchKeywordText } from '../utils/getSearchKeywordText'

const SearchInput = ({ selectedCategory, keyword, inputHandler }) => {
  const data = getSearchKeywordText(selectedCategory)
  return (
    <div className="search-text-input">
      <label htmlFor="keyword">{data.label}</label>
      <input
        className="keyword-input form-control"
        type="text"
        name="keyword"
        id="keyword"
        placeholder={data.placeholder}
        value={keyword}
        onInput={e => {inputHandler(e.target.value)}}
      />
    </div>
  )
}

export default SearchInput
