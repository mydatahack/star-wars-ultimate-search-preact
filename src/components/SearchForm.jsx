import { h, render, Component} from 'preact'
import SearchInput from './SearchInput'
// for testing api call
import { searchRequest, interateApiCall } from '../utils/api'
import { PEOPLE_SEARCH_URL } from '../constants/constantValues'

class SearchForm extends Component {

  // async componentDidMount() {

  //   const response = await searchRequest(PEOPLE_SEARCH_URL + 'luke')
  //   console.log('checking response: ', response.results[0])
  //   const secondReponse = await interateApiCall(response.results[0])
  //   console.log('chcking the final response', secondReponse)
  // }

  render() {
    const { selectedCategory, searchKeyword } = this.props.information
    const { onUpdateSelectedCategory, onUpdateSearchKeyword, onSubmitSearchResult } = this.props
    return (
      <div>
        <div className="opening-crawl-container">
          <h4 className="opening-crawl-title">A long time ago in a galaxy far,</h4>
          <h4 className="opening-crawl-title">far away....</h4>
        </div>
        <form className="query-form">
          <label htmlFor="category">Category</label>
          <select
            className="form-control"
            id="category"
            name="category"
            value={selectedCategory}
            onChange={e => {onUpdateSelectedCategory(e.target.value)}}
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
            />
          }
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-primary btn-section-search"
              onClick={() => onSubmitSearchResult(searchKeyword)}
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
