import { h, component } from 'preact'
import { expect } from 'chai'
import sinon from 'sinon'
import { mount } from 'enzyme'
import AutoSuggestion from '../AutoSuggestion'

describe('<AutoSuggestion />', () => {
  const onUpdateSearchKeywordSpy = sinon.spy()
  const onUpdateShowAutoSuggestion = sinon.spy()
  const defaultWrapper = mount(
    <AutoSuggestion
      suggestions={['suggestion1', 'suggestion2']}
      onUpdateSearchKeyword={onUpdateSearchKeywordSpy}
      onUpdateShowAutoSuggestion={onUpdateShowAutoSuggestion}
    />
  )

  it('should fire onclick event by clicking list', () => {
    const targetElement = defaultWrapper.find('li').at(0)
    targetElement.simulate('click')
    expect(onUpdateSearchKeywordSpy.calledWith('suggestion1')).to.equal(true)
    expect(onUpdateShowAutoSuggestion.calledWith(false)).to.equal(true)
  })

  it('should have the correct suggestions rendered', () => {
    expect(defaultWrapper.find('li').at(0).text()).to.equal('suggestion1')
    expect(defaultWrapper.find('li').at(1).text()).to.equal('suggestion2')
  })

  it('should have the ul with correct class name', () => {
    expect(defaultWrapper.find('ul').hasClass('keyword-dropdown')).to.equal(true)
  })
})
