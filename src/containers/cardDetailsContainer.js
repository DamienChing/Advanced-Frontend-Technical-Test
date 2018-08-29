import { connect } from 'react-redux'
import cardDetails from '../components/cardDetails'
import { selectCard } from '../actions'


const mapStateToProps = (state) => {
    return { card: state.viewer.selectedCard };
}
export default connect(mapStateToProps, { selectCard })(cardDetails);
