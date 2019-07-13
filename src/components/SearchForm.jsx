import { h, render, Component} from 'preact'
import SearchInput from './SearchInput'
import { SELECT_FIELD_HELP } from '../constants/constantValues'
import SquareLoader from '../components/elements/SquareLoader'

class SearchForm extends Component {

  render() {
    const {
      selectedCategory,
      searchKeyword,
      suggestions,
      fetchingSuggestionSuccess,
      showAutoSuggestion,
      focusKeywordInput,
      fetchingSuggestion
    } = this.props.information

    const {
      onUpdateSelectedCategory,
      onUpdateSearchKeyword,
      onSubmitSearchResult,
      onUpdateShowAutoSuggestion,
      onUpdateFocusKeywordInput
    } = this.props

    return (
      <div>
        <div className="opening-crawl-container">
          <h4 className="opening-crawl-title">A long time ago in a galaxy far,</h4>
          <h4 className="opening-crawl-title">far away....</h4>
        </div>
        <form autocomplete="off" className="query-form">
          <label htmlFor="category">Choose Category</label>
          <p class="keyword-input-help">
            {SELECT_FIELD_HELP}
          </p>
          <select
            className="form-control"
            id="category"
            name="category"
            value={selectedCategory}
            onChange={e => {
              onUpdateSelectedCategory(e.target.value)
              onUpdateFocusKeywordInput(true)
            }}
          >
            <option value="">Select a category you may</option>
            <option value="films">Films</option>
            <option value="people">People</option>
            <option value="planets">Planets</option>
            <option value="species">Species</option>
            <option value="starships">Starships</option>
            <option value="vehicles">Vehicles</option>
          </select>
          {selectedCategory &&
            <SearchInput
              selectedCategory={selectedCategory}
              keyword={searchKeyword}
              inputHandler={onUpdateSearchKeyword}
              suggestions={suggestions}
              fetchingSuggestionSuccess={fetchingSuggestionSuccess}
              onUpdateSearchKeyword={onUpdateSearchKeyword}
              onUpdateShowAutoSuggestion={onUpdateShowAutoSuggestion}
              showAutoSuggestion={showAutoSuggestion}
              focusKeywordInput={focusKeywordInput}
              fetchingSuggestion={fetchingSuggestion}
            />
          }
          <div className="d-flex justify-content-between align-items-end">
            <p class="swapi-ref"><a class="swapi-link" href="https://swapi.co/" target="_blank">Powered by SWAPI</a></p>
            {fetchingSuggestion && showAutoSuggestion && <SquareLoader/>}
            <button
              type="submit"
              className="btn btn-primary btn-section-search"
              onClick={(e) => {
                e.preventDefault()
                onSubmitSearchResult(searchKeyword)
                onUpdateFocusKeywordInput(false)
              }}
              disabled={!searchKeyword.length}
            >Use Force
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default SearchForm
