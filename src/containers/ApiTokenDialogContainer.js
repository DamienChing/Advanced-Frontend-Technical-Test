import { connect } from 'react-redux'
import { changePage } from '../actions'
import ApiTokenDialog from '../components/ApiTokenDialog'

export default connect(null, { changePage })(ApiTokenDialog)