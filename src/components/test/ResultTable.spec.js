import { h, component } from 'preact'
import { expect } from 'chai'
import sinon from 'sinon'
import { mount } from 'enzyme'
import ResultTable from '../ResultTable'

describe('<ResultTable />', () => {

  const information = {
    selectedCategory: '',
    searchKeyword: '',
    fetching: false,
    apiSuccess: true,
    apiFailed: false,
    fetchingSuggesion: false,
    fetchingSuggestionSuccess: true,
    fetchingSuggestionFailed: false,
    stopAutoScroll: false,
    showAutoSuggestion: false,
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

  it('scrollResults() should be called on componentDidUpdate when stopAutoScroll=false', () => {
    window.HTMLElement.prototype.scrollIntoView = function() {}
    const wrapper = mount(
      <ResultTable
        information={information}
      />
    )
    const instance = wrapper.instance()
    const spy = sinon.spy(instance, 'scrollResults')
    instance.componentDidUpdate()
    expect(spy.callCount).to.equal(1)
  })

  it('scrollIntoView() should be called when scrollResults() is invoked', () => {
    window.HTMLElement.prototype.scrollIntoView = function() {}
    const wrapper = mount(
      <ResultTable
        information={information}
      />
    )

    const instance = wrapper.instance()
    const spy = sinon.spy(instance.searchTitle, 'scrollIntoView')
    instance.scrollResults()
    expect(spy.callCount).to.equal(1)
  })

  it('should render table on apiSuccess=true', () => {
    const wrapper = mount(<ResultTable information={information}/>)
    expect(wrapper.find('div').at(2).hasClass('search-result-container')).to.equal(true)
    expect(wrapper.find('h2').text()).to.equal(information.searchResult.name)
    expect(wrapper.find('table').hasClass('result-table')).to.equal(true)
    expect(wrapper.find('tbody').hasClass('result-table-body')).to.equal(true)
    expect(wrapper.find('ResultTableElement').props().searchResult).to.deep.equal(information.searchResult)
  })

  it('should render <Spinner /> when fetching', () => {
    const props = {
      selectedCategory: '',
      searchKeyword: '',
      fetching: true,
      apiSuccess: true,
      apiFailed: false,
      fetchingSuggesion: false,
      fetchingSuggestionSuccess: true,
      fetchingSuggestionFailed: false,
      stopAutoScroll: true,
      showAutoSuggestion: false,
      focusKeywordInput: false,
      suggestions: [],
      searchResult: {}
    }

    const wrapper = mount(<ResultTable information={props}/>)
    expect(wrapper.find('Spinner').length).to.equal(1)
  })

  it('should have the div for autoScroll', () => {
    const wrapper = mount(<ResultTable information={information}/>)
    expect(wrapper.find('div').at(1).hasClass('dummy')).to.equal(true)
  })
})

