export const initialState = {
  information: {
    selectedCategory: '',
    searchKeyword: '',
    fetching: false,
    apiSuccess: false,
    apiFailed: false,
    fetchingSuggesion: false,
    fetchingSuggestionSuccess: false,
    fetchingSuggestionFailed: false,
    stopAutoScroll: true,
    showAutoSuggestion: false,
    suggestions: [],
    searchResult: {}
  }
}
