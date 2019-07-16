import { Provider, connect } from 'preact-redux'
import { h, component } from 'preact'
import SearchFrom from '../SearchForm'
import {
  updateSelectedCategory,
  updateShowAutoSuggestion,
  updateSuggestionResults,
  submitSearchResult,
  updateFocusKeywordInput
} from '../../actions/searchFormAction'

const mapStateToProps = (state) => {
  return {information: state.information}
}

const mapDispatchToProps = (dispatch, ownProps, state) => {
  return {
    onUpdateSelectedCategory: (selectedCategory) => {
      dispatch(updateSelectedCategory(selectedCategory))
    },
    onUpdateSearchKeyword: (keyword) => {
      dispatch(updateSuggestionResults(keyword))
    },
    onSubmitSearchResult: (keyword) => {
      dispatch(submitSearchResult(keyword))
    },
    onUpdateShowAutoSuggestion: (show) => {
      dispatch(updateShowAutoSuggestion(show))
    },
    onUpdateFocusKeywordInput: (focus) => {
      dispatch(updateFocusKeywordInput(focus))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFrom)
