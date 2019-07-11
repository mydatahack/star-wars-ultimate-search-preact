import { connect } from 'preact-redux'
import ResultTable from '../ResultTable'

const mapStateToProps = (state) => {
  return {information: state.information}
}

export default connect(mapStateToProps, null)(ResultTable)
