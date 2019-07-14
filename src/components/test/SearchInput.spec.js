import { h, component } from 'preact'
import { expect } from 'chai'
import sinon from 'sinon'
import { mount } from 'enzyme'
import SearchInput from '../SearchInput'
import { INPUT_FIELD_HELP, PEOPLE_LABEL, PEOPLE_PLACEHOLDER} from '../../constants/constantValues'

describe('<SearchInput />', () => {

  let wrapperDefault

  beforeEach(() => {
    wrapperDefault = mount(
      <SearchInput
        selectedCategory='people'
        keyword='hello'
        inputHandler={() => {}}
        suggestions={[]}
        fetchingSuggestionSuccess={true}
        onUpdateSearchKeyword={()=>{}}
        showAutoSuggestion={true}
        focusKeywordInput={true}
      />
    )
  })

  // UI related function call test
  it('should call focusKeywordInput() on componentDidMount', () => {
    global.innerWidth = 500
    global.dispatchEvent(new Event('resize'))

    const instance = wrapperDefault.instance()
    const spy = sinon.spy(instance, 'focusKeywordInput')
    instance.componentDidMount()
    expect(spy.calledOnce).to.equal(true)
  })

  it('should call focusKeywordInput on componentDidUpdate', () => {
    const instance = wrapperDefault.instance()
    const spy = sinon.spy(instance, 'focusKeywordInput')
    instance.componentDidUpdate()
    expect(spy.calledOnce).to.equal(true)
  })

  it('should call focus() on keywordInput element when focusKeywordInput is invoked', () => {
    const instance = wrapperDefault.instance()
    const spy = sinon.spy(instance.keywordInput, 'focus')
    instance.focusKeywordInput()
    expect(spy.calledOnce).to.equal(true)
  })

  it('should call scrollIntoView() on keywordInputLabel element when <= 600px', () => {
    global.window.innerWidth = 500
    const instance = wrapperDefault.instance()
    const spy = sinon.spy(instance.keywordInputLabel, 'scrollIntoView')
    instance.focusKeywordInput()
    expect(spy.calledOnce).to.equal(true)
  })

  it('should not call scrollIntoView() on keywordInputLabel element when > 600px', () => {
    global.window.innerWidth = 700
    const instance = wrapperDefault.instance()
    const spy = sinon.spy(instance.keywordInputLabel, 'scrollIntoView')
    instance.focusKeywordInput()
    expect(spy.calledOnce).to.equal(false)
  })

  // UI test
  it('should have the correct html structure', () => {
    expect(wrapperDefault.find('div').at(0).hasClass('search-text-input')).to.equal(true)
    expect(wrapperDefault.find('label').at(0).text()).to.equal(PEOPLE_LABEL)
    expect(wrapperDefault.find('input').at(0).prop('placeholder')).to.equal(PEOPLE_PLACEHOLDER)
    expect(wrapperDefault.find('p').at(0).text()).to.equal(INPUT_FIELD_HELP)
  })

  it('should render <AutoSuggestion> when it meets conditions', () => {
    const wrapper = mount(
      <SearchInput
        selectedCategory='people'
        keyword='hello'
        inputHandler={() => {}}
        suggestions={['suggestion1']}
        fetchingSuggestionSuccess={true}
        onUpdateSearchKeyword={()=>{}}
        showAutoSuggestion={true}
        focusKeywordInput={true}
      />
    )
    expect(wrapper.find('AutoSuggestion').length).to.equal(1)
  })

  it('should not render <AutoSuggestion> when fetchingSuggestionSuccess is false', () => {
    const wrapper = mount(
      <SearchInput
        selectedCategory='people'
        keyword='hello'
        inputHandler={() => {}}
        suggestions={['suggestion1']}
        fetchingSuggestionSuccess={false}
        onUpdateSearchKeyword={()=>{}}
        showAutoSuggestion={true}
        focusKeywordInput={true}
      />
    )
    expect(wrapper.find('AutoSuggestion').length).to.equal(0)
  })

  it('should not render <AutoSuggestion> when no search keyword is in input field', () => {
    const wrapper = mount(
      <SearchInput
        selectedCategory='people'
        keyword=''
        inputHandler={() => {}}
        suggestions={['suggestion1']}
        fetchingSuggestionSuccess={false}
        onUpdateSearchKeyword={()=>{}}
        showAutoSuggestion={true}
        focusKeywordInput={true}
      />
    )
    expect(wrapper.find('AutoSuggestion').length).to.equal(0)
  })

  it('should not render <AutoSuggestion> when showAutoSuggestion=false', () => {
    const wrapper = mount(
      <SearchInput
        selectedCategory='people'
        keyword='hello'
        inputHandler={() => {}}
        suggestions={['suggestion1']}
        fetchingSuggestionSuccess={false}
        onUpdateSearchKeyword={()=>{}}
        showAutoSuggestion={false}
        focusKeywordInput={true}
      />
    )
    expect(wrapper.find('AutoSuggestion').length).to.equal(0)
  })

  it('should not render <AutoSuggestion> when showAutoSuggestion=false', () => {
    const wrapper = mount(
      <SearchInput
        selectedCategory='people'
        keyword='hello'
        inputHandler={() => {}}
        suggestions={['suggestion1']}
        fetchingSuggestionSuccess={false}
        onUpdateSearchKeyword={()=>{}}
        showAutoSuggestion={false}
        focusKeywordInput={true}
      />
    )
    expect(wrapper.find('AutoSuggestion').length).to.equal(0)
  })

  it('should not render <AutoSuggestion> when no suggestions', () => {
    const wrapper = mount(
      <SearchInput
        selectedCategory='people'
        keyword='hello'
        inputHandler={() => {}}
        suggestions={['suggestion1']}
        fetchingSuggestionSuccess={false}
        onUpdateSearchKeyword={()=>{}}
        showAutoSuggestion={false}
        focusKeywordInput={true}
      />
    )
    expect(wrapper.find('AutoSuggestion').length).to.equal(0)
  })

  // Checking Input handler
  it('should fire inputHandler & onUpdateShowAutoSuggestion onInput', () => {
    const inputHandlerSpy = sinon.spy()
    const onUpdateShowAutoSuggestionSpy = sinon.spy()
    const wrapper = mount(
      <SearchInput
        selectedCategory='people'
        keyword='hello'
        inputHandler={inputHandlerSpy}
        suggestions={['suggestion1']}
        fetchingSuggestionSuccess={false}
        onUpdateSearchKeyword={()=>{}}
        onUpdateShowAutoSuggestion={onUpdateShowAutoSuggestionSpy}
        showAutoSuggestion={false}
        focusKeywordInput={true}
      />
    )
    const input = wrapper.find('input')
    input.instance().value = 'hello'
    input.simulate('input')

    expect(inputHandlerSpy.calledWith('hello')).to.equal(true)
    expect(onUpdateShowAutoSuggestionSpy.calledWith(true)).to.equal(true)
  })

})


