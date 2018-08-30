import { connect } from 'react-redux'
import { changePage } from '../actions'
import paginationControls from '../components/PaginationControls'

export default connect(state => {return {viewer: state.viewer}}, {changePage})(paginationControls);