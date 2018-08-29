import { connect } from 'react-redux'
import cardViewer from '../components/cardViewer'
import { selectCard } from '../actions'


const mapStateToProps = (state) => {
    const {currentPage, pageCount} = state.viewer
    return {cards: state.cards, pageCount, currentPage};
}
export default connect(mapStateToProps, {selectCard})(cardViewer);