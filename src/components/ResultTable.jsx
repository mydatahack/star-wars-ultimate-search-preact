import { h } from 'preact'
import Spinner from './Spinner'
import ResultTableElement from './ResultTableElement'

const ResultTable = ({ information }) => {
  const { searchResult, fetching, apiSuccess } = information
  let resultTitle
  if (apiSuccess) {
    resultTitle = searchResult.resource === 'films' ? searchResult.title : searchResult.name
  }
  return (
    <div>
      {fetching && <Spinner />}
      {apiSuccess &&
        <div>
          <h2 class="search-result-title">{resultTitle}</h2>
          <table class="result-table">
            <tbody class="result-table-body">
              <ResultTableElement searchResult={searchResult} />
            </tbody>
          </table>
        </div>
      }
    </div>
  )
}

export default ResultTable
