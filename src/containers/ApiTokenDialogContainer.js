import { connect } from 'react-redux'
import { fetchCardsIfNeeded } from '../actions'
import ApiTokenDialog from '../components/ApiTokenDialog'

export default connect(null, { fetchCardsIfNeeded })(ApiTokenDialog)