import { h, Component } from 'preact'
import Spinner from './elements/Spinner'
import ResultTableElement from './elements/ResultTableElement'

class ResultTable extends Component {

  scrollResults = () => {
    if(this.searchTitle) {
      this.searchTitle.scrollIntoView({ alignToTop: 'true', behavior: 'smooth'})
    }
  }

  componentDidUpdate() {
    if (!this.props.information.stopAutoScroll) {
      this.scrollResults()
    }
  }

  render() {
    const { searchResult, fetching, apiSuccess } = this.props.information
    let resultTitle
    if (apiSuccess) {
      resultTitle = searchResult.resource === 'films' ? searchResult.title : searchResult.name
    }

    return (
      <div>
        <div class="dummy" ref={element => this.searchTitle = element}></div>
        {fetching && <Spinner />}
        {apiSuccess &&
          <div class="search-result-container">
            <h2
              class="search-result-title"
            >
              {resultTitle}
            </h2>
            <table class="result-table">
              <tbody class="result-table-body">
                <ResultTableElement searchResult={searchResult} />
              </tbody>
            </table>
          </div>
        }
        {/* Todo: need to come up with better way to focus to input on mobile */}
        {(!apiSuccess && window.innerWidth <= 500) &&
          <div style="height: 500px"></div>
        }
      </div>
    )
  }
}

export default ResultTable
