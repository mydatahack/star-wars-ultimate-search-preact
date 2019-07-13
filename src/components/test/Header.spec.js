import { h, component } from 'preact'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import Header from '../Header'

const wrapper = shallow(<Header />)

describe('<Header />', () => {
  it('should render h1', () => {
    expect(wrapper.find('h1').text()).equal('Ultimate Search')
  })

})
