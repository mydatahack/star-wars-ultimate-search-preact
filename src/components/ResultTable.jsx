import { h } from 'preact'

import { mapper } from '../utils/mapper'
import { person } from '../utils/models'

const ResultTable = ({ information }) => {
  const { person } = information.person
  return (
    <div style="word-wrap: normal">
      <p>{JSON.stringify(information.person)}</p>


    </div>
  )
}

export default ResultTable
