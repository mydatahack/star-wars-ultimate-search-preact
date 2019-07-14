import { h, component } from 'preact'
import { expect } from 'chai'
import { mount } from 'enzyme'
import DivContainer from '../DivContainer'

describe('<DivContainer />', () => {

  it('should have correct class names', () => {
    const wrapper = mount(<DivContainer className="test" />)
    expect(wrapper.find('div').at(0).hasClass('container')).to.equal(true)
    expect(wrapper.find('div').at(1).hasClass('row')).to.equal(true)
    expect(wrapper.last().hasClass('test')).to.equal(true)
  })

  it('should mount with child element', () => {
    const wrapper = mount(<DivContainer className="test"><h1>Hello</h1></DivContainer>)
    expect(wrapper.find('h1').text()).to.equal('Hello')
  })

})
