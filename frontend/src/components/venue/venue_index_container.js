import { connect } from 'react-redux';
import VenueIndex from './venue_index'; 
import { openNavModal } from '../../actions/nav_actions'; 
import { fetchVenues, createComment, fetchVenueComments, fetchVenueRatings, createVenueRating } from '../../actions/venue_actions';
import { fetchAllLikes, fetchVenueLikes, createLike, deleteLike } from '../../actions/like_actions'; 

import { fetchUsers } from '../../actions/user_actions'; 

const mapStateToProps = (state) => ({
    venues: Object.values(state.venues), 
    users: Object.values(state.entities.users), 
    comments: Object.values(state.comments),
    isAuthenticated: state.session.isAuthenticated,
    currentUser: state.session.user.id, 
    ratings: Object.values(state.ratings), 
    likes: state.likes
});

const mapDispatchToProps = (dispatch) => ({
    fetchVenues: () => dispatch(fetchVenues()), 
    openNavModal: () => dispatch(openNavModal(true)),
    fetchUsers: () => dispatch(fetchUsers()),
    fetchVenueComments: (venueId) => dispatch(fetchVenueComments(venueId)),
    createComment: (venueId, comment, user) => dispatch(createComment(venueId, comment, user)),
    fetchVenueRatings: (venueId) => dispatch(fetchVenueRatings(venueId)), 
    createVenueRating: (venueId, rating, user) => dispatch(createVenueRating(venueId, rating, user)), 
    fetchAllLikes: () => dispatch(fetchAllLikes()),
    fetchVenueLikes: (venueId) => dispatch(fetchVenueLikes(venueId)),
    createLike: (like) => dispatch(createLike(like)), 
    deleteLike: (likeId) => dispatch(deleteLike(likeId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VenueIndex); 
