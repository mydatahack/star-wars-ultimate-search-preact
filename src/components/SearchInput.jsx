import { h, Component } from 'preact'
import { getSearchKeywordText } from '../utils/getSearchKeywordText'
import { INPUT_FIELD_HELP } from '../constants/constantValues'
import AutoSuggestion from './AutoSuggestion'


class SearchInput extends Component {

  focusKeywordInput = () => {
    if (this.keywordInput) this.keywordInput.focus()
  }
  componentDidMount() {
    this.focusKeywordInput()
  }

  render () {
    const {
      selectedCategory,
      keyword,
      inputHandler,
      suggestions,
      fetchingSuggestionSuccess,
      onUpdateSearchKeyword,
      onUpdateShowAutoSuggestion,
      showAutoSuggestion
    } = this.props
    const data = getSearchKeywordText(selectedCategory)
    this.focusKeywordInput()
    return (
      <div className="search-text-input">
        <label htmlFor="keyword">{data.label}</label>
        <p class="keyword-input-help">
          {INPUT_FIELD_HELP}
        </p>
        <input
          className="keyword-input form-control"
          type="text"
          name="keyword"
          id="keyword"
          placeholder={data.placeholder}
          value={keyword}
          onInput={e => {
            inputHandler(e.target.value)
            onUpdateShowAutoSuggestion(true)
          }}
          ref={element => this.keywordInput = element}
        />
        {(fetchingSuggestionSuccess && keyword.length > 0 && showAutoSuggestion) &&
          <AutoSuggestion
            suggestions={suggestions}
            onUpdateSearchKeyword={onUpdateSearchKeyword}
            onUpdateShowAutoSuggestion={onUpdateShowAutoSuggestion}
          />
        }
      </div>
    )
  }
}

export default SearchInput
