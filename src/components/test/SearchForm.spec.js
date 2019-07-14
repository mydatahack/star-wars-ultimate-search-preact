import { h, component } from 'preact'
import { expect } from 'chai'
import sinon from 'sinon'
import { mount } from 'enzyme'
import SearchForm from '../SearchForm'
import { SELECT_FIELD_HELP, SWAPI_REFERENCE } from '../../constants/constantValues'

describe('<SearchForm />' ,() => {

  const defaultInformation =  {
    selectedCategory: 'people',
    searchKeyword: 'test search keyword',
    fetching: false,
    apiSuccess: true,
    apiFailed: false,
    fetchingSuggestion: false,
    fetchingSuggestionSuccess: false,
    fetchingSuggestionFailed: false,
    stopAutoScroll: false,
    showAutoSuggestion: true,
    focusKeywordInput: false,
    suggestions: [],
    searchResult: {
      'resource': 'people',
      'name': 'Luke Skywalker',
      'height': '172',
      'mass': '77',
      'hair_color': 'blond',
      'skin_color': 'fair',
      'eye_color': 'blue',
      'birth_year': '19BBY',
      'gender': 'male',
      'homeworld': 'Tatooine',
      'films': [
        'film1',
        'film1',
      ],
      'species': [
        'Human'
      ],
      'vehicles': [
        'vehicle1',
        'vehicle2'
      ],
      'starships': [
        'starship1',
        'starship2'
      ]
    }
  }
  const onUpdateSelectedCategorySpy = sinon.spy()
  const onUpdateFocusKeywordInputSpy = sinon.spy()
  const onSubmitSearchResultSpy = sinon.spy()
  const onUpdateShowAutoSuggestionSpy = sinon.spy()
  const defaultWrapper = mount(
    <SearchForm
      information={defaultInformation}
      onUpdateSelectedCategory={onUpdateSelectedCategorySpy}
      onUpdateFocusKeywordInput={onUpdateFocusKeywordInputSpy}
      onUpdateSearchKeyword={()=>{}}
      onSubmitSearchResult={onSubmitSearchResultSpy}
      onUpdateShowAutoSuggestion={onUpdateShowAutoSuggestionSpy}
    />
  )

  // Checking event handlers
  it('should fire select onChange event', () => {
    const selectElement = defaultWrapper.find('select')
    const optionPeople = defaultWrapper.find('option').at(2)
    optionPeople.instance().selected = true
    selectElement.simulate('change')
    expect(onUpdateSelectedCategorySpy.calledWith('people')).to.equal(true)
    expect(onUpdateFocusKeywordInputSpy.calledWith(true)).to.equal(true)
  })

  it('should fire submit event', () => {
    const selectElement = defaultWrapper.find('button')
    selectElement.simulate('click')
    expect(onSubmitSearchResultSpy.calledWith('test search keyword')).to.equal(true)
    expect(onUpdateFocusKeywordInputSpy.calledWith(false)).to.equal(true)
  })

  // UI test
  // Todo: not sure why this is not passing
  it('should render SquareLoader while fetching suggestion', () => {
    const information =  {
      selectedCategory: '',
      searchKeyword: 'test search keyword',
      fetching: false,
      apiSuccess: true,
      apiFailed: false,
      fetchingSuggestion: true,
      fetchingSuggestionSuccess: true,
      fetchingSuggestionFailed: false,
      stopAutoScroll: false,
      showAutoSuggestion: true,
      focusKeywordInput: false,
      suggestions: [],
      searchResult: {}
    }
    const wrapper = mount(
      <SearchForm
        information={information}
        onUpdateSelectedCategory={onUpdateSelectedCategorySpy}
        onUpdateFocusKeywordInput={onUpdateFocusKeywordInputSpy}
        onUpdateSearchKeyword={()=>{}}
        onSubmitSearchResult={onSubmitSearchResultSpy}
        onUpdateShowAutoSuggestion={onUpdateShowAutoSuggestionSpy}
      />
    )
    expect(wrapper.find('SquareLoader').length).to.equal(1)
  })

  it('should show SearchInput once the category is selected', () => {
    expect(defaultWrapper.find('SearchInput').prop('selectedCategory')).to.equal('people')
    expect(defaultWrapper.find('SearchInput').prop('keyword')).to.equal('test search keyword')
    expect(defaultWrapper.find('SearchInput').prop('inputHandler')).to.be.an('function')
    expect(defaultWrapper.find('SearchInput').prop('suggestions')).to.deep.equal([])
    expect(defaultWrapper.find('SearchInput').prop('fetchingSuggestionSuccess')).to.equal(false)
    expect(defaultWrapper.find('SearchInput').prop('onUpdateSearchKeyword')).to.be.an('function')
    expect(defaultWrapper.find('SearchInput').prop('onUpdateShowAutoSuggestion')).to.be.an('function')
    expect(defaultWrapper.find('SearchInput').prop('showAutoSuggestion')).to.equal(true)
    expect(defaultWrapper.find('SearchInput').prop('focusKeywordInput')).to.equal(false)
    expect(defaultWrapper.find('SearchInput').prop('fetchingSuggestion')).to.equal(false)
  })

  it('should have the correct text value for the form', () => {
    const information =  {
      selectedCategory: '',
      searchKeyword: 'test search keyword',
      fetching: false,
      apiSuccess: true,
      apiFailed: false,
      fetchingSuggestion: true,
      fetchingSuggestionSuccess: true,
      fetchingSuggestionFailed: false,
      stopAutoScroll: false,
      showAutoSuggestion: true,
      focusKeywordInput: false,
      suggestions: [],
      searchResult: {}
    }
    // the intent here is not to render <SearchInput />
    const wrapper = mount(
      <SearchForm
        information={information}
        onUpdateSelectedCategory={onUpdateSelectedCategorySpy}
        onUpdateFocusKeywordInput={onUpdateFocusKeywordInputSpy}
        onUpdateSearchKeyword={()=>{}}
        onSubmitSearchResult={onSubmitSearchResultSpy}
        onUpdateShowAutoSuggestion={onUpdateShowAutoSuggestionSpy}
      />
    )
    const form = wrapper.find('form')
    expect(form.find('label').at(0).text()).to.equal('Choose Category')
    expect(form.find('p').at(0).text()).to.equal(SELECT_FIELD_HELP)
    expect(form.find('p').at(1).text()).to.equal(SWAPI_REFERENCE)
    expect(form.find('button').text()).to.equal('Use Force')
  })

  it('should have the button disabled without text input', () => {
    const information =  {
      selectedCategory: '',
      searchKeyword: '',
      fetching: false,
      apiSuccess: true,
      apiFailed: false,
      fetchingSuggestion: true,
      fetchingSuggestionSuccess: true,
      fetchingSuggestionFailed: false,
      stopAutoScroll: false,
      showAutoSuggestion: true,
      focusKeywordInput: false,
      suggestions: [],
      searchResult: {}
    }
    // the intent here is not to render <SearchInput />
    const wrapper = mount(
      <SearchForm
        information={information}
        onUpdateSelectedCategory={onUpdateSelectedCategorySpy}
        onUpdateFocusKeywordInput={onUpdateFocusKeywordInputSpy}
        onUpdateSearchKeyword={()=>{}}
        onSubmitSearchResult={onSubmitSearchResultSpy}
        onUpdateShowAutoSuggestion={onUpdateShowAutoSuggestionSpy}
      />
    )
    const form = wrapper.find('form')
    expect(form.find('button').prop('disabled')).to.equal(true)
  })

  it('should have the button enabled with text input', () => {
    const form = defaultWrapper.find('form')
    expect(form.find('button').prop('disabled')).to.equal(false)
  })
})
