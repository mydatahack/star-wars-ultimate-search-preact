import { h, component } from 'preact'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import Header from '../Header'

describe('<Header />', () => {

  it('should render h1', () => {
    const wrapper = shallow(<Header />)
    expect(wrapper.find('h1').text()).equal('Ultimate Search')
  })

  it('should have img tag with correct attributes', () => {
    const wrapper = shallow(<Header />)
    expect(wrapper.find('img').prop('src')).to.equal('img/star-wars-logo.png')
    expect(wrapper.find('img').prop('alt')).to.equal('Star Wars Logo')
    expect(wrapper.find('img').hasClass('star-wars-logo')).to.equal(true)
  })

})
