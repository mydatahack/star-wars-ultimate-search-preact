import { h, component } from 'preact'
import { expect } from 'chai'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import ResultTableDataList from '../ResultTableDataList'

describe('<ResultTableDataList />', () => {

  it('should create correct unordered list', () => {
    const data = ['data1', 'data2']
    const wrapper = shallow(<ResultTableDataList array={data} />)
    expect(wrapper.find('ul').length).to.equal(1)
    expect(wrapper.find('li').at(0).text()).to.equal('data1')
    expect(wrapper.find('li').at(1).text()).to.equal('data2')
  })
})
