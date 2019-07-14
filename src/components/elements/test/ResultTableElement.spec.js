import { h, component } from 'preact'
import { expect } from 'chai'
import sinon from 'sinon'
import { mount } from 'enzyme'
import ResultTableElement from '../ResultTableElement'

describe('<ResultTableElement />', () => {

  it('should create correct table elements', () => {
    const searchResult = {
      name: 'name',
      title: 'title',
      resource: 'people',
      data_point_one: 'data point 1',
      data_point_two: 'data point 2',
    }
    const wrapper = mount(<ResultTableElement searchResult={searchResult} />)

    const firstTableRow = wrapper.find('tr').at(0)
    const firstTableData = wrapper.find('td').at(0)
    expect(firstTableRow.find('th').at(0).text()).to.equal('Data Point One')
    expect(firstTableData.find('li').at(0).text()).to.equal('data point 1')

    const secondTableRow = wrapper.find('tr').at(1)
    const secondTableData = wrapper.find('td').at(1)
    expect(secondTableRow.find('th').at(0).text()).to.equal('Data Point Two')
    expect(secondTableData.find('li').at(0).text()).to.equal('data point 2')

  })
})
