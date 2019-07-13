import { h } from 'preact'
import ResultTableDataList from './ResultTableDataList'
import { tbHeaderFormatter } from '../../utils/helper'

const ResultTableElement = ({searchResult}) => {
  const keyArray = Object.keys(searchResult)
  const tableRow = keyArray.map((key) => {
    let list
    if (key !== 'name' && key !== 'title' && key !== 'resource') {
      if (Array.isArray(searchResult[key])) {
        list = <ResultTableDataList array={searchResult[key]} />
      } else {
        list = <ul><li>{searchResult[key]}</li></ul>
      }
      return (
        <tr class="result-tr">
          <th class="result-th">{tbHeaderFormatter(key)}</th>
          <td class="result-td" class="result-td">{list}</td>
        </tr>
      )
    }
  })
  return <div>{tableRow}</div>
}

export default ResultTableElement
