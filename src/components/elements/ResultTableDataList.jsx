import { h } from 'preact'

const ResultTableDataList = ({array}) => {
  const dataList = array.map((data) => {
    return <li>{data}</li>
  })
  return <ul>{dataList}</ul>
}

export default ResultTableDataList
